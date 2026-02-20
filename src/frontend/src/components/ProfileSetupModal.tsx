import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSaveCallerUserProfile } from '../hooks/useUserProfile';
import { toast } from 'sonner';
import { Loader2, User } from 'lucide-react';

interface ProfileSetupModalProps {
  open: boolean;
}

export default function ProfileSetupModal({ open }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        roomNumber: roomNumber.trim() || undefined,
      });
      toast.success('Profile created successfully!');
    } catch (error) {
      toast.error('Failed to create profile', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md border-2 border-amber-200" showCloseButton={false}>
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <User className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center text-amber-900">Welcome to StickSmart!</DialogTitle>
          <DialogDescription className="text-center text-base">
            Please set up your profile to continue
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-amber-900 font-medium">
              Your Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-amber-300 focus:border-amber-500"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomNumber" className="text-amber-900 font-medium">
              Room Number (Optional)
            </Label>
            <Input
              id="roomNumber"
              type="text"
              placeholder="Enter your room number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="border-amber-300 focus:border-amber-500"
            />
          </div>

          <Button
            type="submit"
            disabled={saveProfile.isPending || !name.trim()}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            size="lg"
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Profile...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
