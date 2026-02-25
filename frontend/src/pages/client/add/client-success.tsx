import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const ClientSuccess = ({ submittedValues, handleReset }: any) => {
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
            className="w-full mt-2 cursor-pointer"
            onClick={handleReset}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Add Another Client
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientSuccess;
