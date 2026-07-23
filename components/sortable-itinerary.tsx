import { Location } from "@/app/generated/prisma";
import { reorderItinerary } from "@/lib/actions/reorder-itineraty";
import {DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";


interface SortableItineraryProps {
  locations: Location[];
  tripId: string;
}


export default function SortableItinerary({
  locations,
  tripId,
}: SortableItineraryProps) {
  const [localLocation, setLocalLocation] = useState(locations);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = localLocation.findIndex((item) => item.id === active.id);
      const newIndex = localLocation.findIndex((item) => item.id === over!.id);

      const newLocationsOrder = arrayMove(
        localLocation,
        oldIndex,
        newIndex
      ).map((item, index) => ({ ...item, order: index }));

      setLocalLocation(newLocationsOrder);

      await reorderItinerary(
        tripId,
        newLocationsOrder.map((item) => item.id)
      );
    }
  };

  return (
    <div></div>
  );
}