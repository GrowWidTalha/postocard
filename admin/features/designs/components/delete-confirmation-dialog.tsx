import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { Spinner } from "@/components/spinner"

  interface DeleteConfirmationDialogProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    onDelete: () => void
    designName: string
    isDeleting: boolean
  }

  export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
    isOpen,
    setIsOpen,
    onDelete,
    designName,
    isDeleting,
  }) => {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this design?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the design "{designName}" and remove it from our
              servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button disabled={isDeleting} variant="destructive" onClick={onDelete}>
              {isDeleting ? <Spinner size="small" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
