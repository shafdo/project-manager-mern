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
import { Badge } from '@/components/ui/badge';
import {
  UserPlus,
  Hash,
  User,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle2,
  Edit,
} from 'lucide-react';
import type { ClientType } from '@/types/client';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object({
  id: Yup.string().trim().required('Client ID is required'),
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

const ClientEdit: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<ClientType | null>(
    null
  );

  const formik = useFormik<ClientType>({
    initialValues: {
      id: '',
      name: '',
      email: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Client submitted:', values);
      setSubmittedValues(values);
      setSubmitted(true);
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setSubmitted(false);
    setSubmittedValues(null);
  };

  const isFieldError = (field: keyof ClientType) =>
    formik.touched[field] && Boolean(formik.errors[field]);

  if (submitted && submittedValues) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-10 pb-8 flex flex-col items-center text-center gap-4">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Client Added!
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium text-foreground">
                  {submittedValues.name}
                </span>{' '}
                has been successfully registered.
              </p>
            </div>
            <Separator />
            <div className="w-full text-left space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID</span>
                <Badge variant="secondary">{submittedValues.id}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{submittedValues.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{submittedValues.phone}</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={handleReset}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Add Another Client
            </Button>
          </CardContent>
        </Card>
      </div>
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
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="size-6" /> Back
          </Link>
        </Button>
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2">
            <Edit className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Edit Client
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in the details to register a new client
            </p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Client Information</CardTitle>
            <CardDescription>All fields are required</CardDescription>
          </CardHeader>

          <form onSubmit={formik.handleSubmit}>
            <CardContent className="space-y-5">
              {/* ID */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="id"
                  className="flex items-center gap-1.5 text-sm font-medium"
                >
                  <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                  Client ID
                </Label>
                <Input
                  id="id"
                  name="id"
                  placeholder="e.g. CLT-001"
                  value={formik.values.id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={true}
                  className={
                    isFieldError('id')
                      ? 'border-destructive focus-visible:ring-destructive'
                      : ''
                  }
                />
                {isFieldError('id') && (
                  <p className="text-xs text-destructive">{formik.errors.id}</p>
                )}
              </div>

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
                disabled={formik.isSubmitting}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Client
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

export default ClientEdit;
