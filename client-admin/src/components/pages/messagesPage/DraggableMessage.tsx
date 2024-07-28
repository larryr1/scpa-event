import { useDraggable } from "@dnd-kit/core"

interface DraggableMessageProps {
  id: any;
  text: string;
}

export const DraggableMessage = (props: DraggableMessageProps) => {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {props.text}
    </div>
  )
}