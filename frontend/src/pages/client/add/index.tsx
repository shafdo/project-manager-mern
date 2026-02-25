'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  UserPlus,
  User,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import type { ClientType, CreateClientInput } from '@/types/client';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { ADD_CLIENT } from '@/graphql/mutations/client.mutations';
import ErrorComponent from '@/components/ui/error';
import ClientSuccess from './client-success';
import { GET_CLIENTS } from '@/graphql/queries/client.queries';

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  phone: Yup.string()
    .trim()
    .matches(/^\+?[\d\s\-().]{7,}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
});

const ClientAdd: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [submittedValues, setSubmittedValues] = useState<ClientType | null>(
    null
  );

  const formik = useFormik<CreateClientInput>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      createClient({
        variables: {
          name: values.name,
          email: values.email,
          phone: values.phone,
        },
      });
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setSubmitted(false);
    setSubmittedValues(null);
  };

  const isFieldError = (field: keyof CreateClientInput) =>
    formik.touched[field] && Boolean(formik.errors[field]);

  // GQ mutations
  const [createClient, { loading, error, data }] = useMutation<{
    createClient: ClientType;
  }>(ADD_CLIENT, {
    update(cache, { data }) {
      // Refresh the cache to add the new client
      if (!data) return;

      const existingClientsCache = cache.readQuery<{ clients: ClientType[] }>({
        query: GET_CLIENTS,
      });
      const newClients = existingClientsCache?.clients.concat([
        data.createClient,
      ]);

      cache.writeQuery({ query: GET_CLIENTS, data: { clients: newClients } });
    },
    onCompleted: (data) => {
      setSubmittedValues(data.createClient);
      setSubmitted(true);
      setDeleteError(null);
    },
    onError: (err: Error) => {
      setDeleteError(err.message);
    },
  });
  // GQ mutations end

  if (submitted && submittedValues) {
    return (
      <ClientSuccess
        submittedValues={submittedValues}
        handleReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-start justify-center p-6 pt-16">
      <div className="w-full max-w-lg space-y-6">
        <Button
          type="button"
          size={'lg'}
          variant="outline"
          className="flex-1 cursor-pointer"
          onClick={handleReset}
        >
          <Link to="/client/list" className="flex items-center gap-2">
            <ArrowLeft className="size-6" /> Back
          </Link>
        </Button>
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2">
            <UserPlus className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Add New Client
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in the details to register a new client
            </p>
          </div>
        </div>

        {/* ── Error state ── */}
        {deleteError && <ErrorComponent message={deleteError} />}

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-1">
            <CardTitle className="text-base">Client Information</CardTitle>
            <CardDescription>All fields are required</CardDescription>
          </CardHeader>

          <form onSubmit={formik.handleSubmit}>
            <CardContent className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="flex items-center gap-1.5 text-sm font-medium"
                >
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Jane Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    isFieldError('name')
                      ? 'border-destructive focus-visible:ring-destructive'
                      : ''
                  }
                />
                {isFieldError('name') && (
                  <p className="text-xs text-destructive">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-1.5 text-sm font-medium"
                >
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    isFieldError('email')
                      ? 'border-destructive focus-visible:ring-destructive'
                      : ''
                  }
                />
                {isFieldError('email') && (
                  <p className="text-xs text-destructive">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="phone"
                  className="flex items-center gap-1.5 text-sm font-medium"
                >
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    isFieldError('phone')
                      ? 'border-destructive focus-visible:ring-destructive'
                      : ''
                  }
                />
                {isFieldError('phone') && (
                  <p className="text-xs text-destructive">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
            </CardContent>

            <Separator className="my-4" />

            <CardFooter className="flex gap-3 pt-5">
              <Button
                type="button"
                variant="outline"
                className="flex-1 cursor-pointer"
                onClick={handleReset}
              >
                Clear
              </Button>
              <Button
                type="submit"
                className="flex-1 cursor-pointer"
                disabled={loading}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Make sure the client details are correct before submitting.
        </p>
      </div>
    </div>
  );
};

export default ClientAdd;
