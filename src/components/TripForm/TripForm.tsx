import React from 'react';
import type { FormData } from '@/types';
import { Button } from '../ui/button'; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TripFormProps {
  onSubmit: (formData: FormData) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit, open, onOpenChange }) => {
  const [formData, setFormData] = React.useState<FormData>({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    current_cycle_hours: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'current_cycle_hours' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogContent className="sm:max-w-[600px] text-white bg-black border-none ">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Plan a New Trip</DialogTitle>
            <DialogDescription>
              Enter the trip details to generate an optimized route and schedule.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current_location" className="text-right">
                Current Location
              </Label>
              <Input
                id="current_location"
                required
                value={formData.current_location}
                onChange={handleChange}
                className="col-span-3 py-6 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700 border-teal-700 border-2 hover:border-teal-700 outline-none" 
                placeholder="Enter current location"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pickup_location" className="text-right">
                Pickup Location
              </Label>
              <Input
                id="pickup_location"
                required
                value={formData.pickup_location}
                onChange={handleChange}
                className="col-span-3 py-6 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700 border-teal-700 border-2 hover:border-teal-700 outline-none"
                placeholder="Enter pickup location"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dropoff_location" className="text-right">
                Dropoff Location
              </Label>
              <Input
                id="dropoff_location"
                required
                value={formData.dropoff_location}
                onChange={handleChange}
                className="col-span-3 py-6 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700 border-teal-700 border-2 hover:border-teal-700 outline-none"
                placeholder="Enter dropoff location"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current_cycle_hours" className="text-right">
                Current Cycle Hours
              </Label>
              <Input
                type="number"
                id="current_cycle_hours"
                min="0"
                step="0.1"
                required
                value={formData.current_cycle_hours}
                onChange={handleChange}
                className="col-span-3 py-6 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700 border-teal-700 border-2 hover:border-teal-700 outline-none"
                placeholder="Enter current cycle hours"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" size={"lg"} className='bg-teal-600 hover:bg-teal-500 text-white'>Generate Trip Plan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TripForm;