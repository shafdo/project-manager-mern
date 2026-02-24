import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const DeleteDialogComponent = ({
  deleteTarget,
  setDeleteTarget,
  confirmDelete,
}: any) => (
  <AlertDialog
    open={!!deleteTarget}
    onOpenChange={(open) => !open && setDeleteTarget(null)}
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete ClientType</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete{' '}
          <span className="font-semibold text-foreground">
            {deleteTarget?.name}
          </span>
          ? This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          onClick={confirmDelete}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteDialogComponent;
