import { useDroppable } from "@dnd-kit/core"
import { DraggableMessage } from "./DraggableMessage";

export const DroppableMessageContainer = (props: { children: React.ReactNode, droppableId: any }) => {
  const {setNodeRef} = useDroppable({
    id: props.droppableId,
  });

  return (
    <div ref={setNodeRef}>
      <DraggableMessage id={1} text="25" />
      <DraggableMessage id={2} text="25" />
      <DraggableMessage id={3} text="25" />
      <DraggableMessage id={4} text="25" />
    </div>
  )
}