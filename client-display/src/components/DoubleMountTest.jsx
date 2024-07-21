import { useEffect } from "react";
import useIsMountedRef from "use-is-mounted-ref";

export const DoubleMountText = () => {

  const hasMounted = useIsMountedRef();

  useEffect(() => {
    console.log("Checking mount")
    if (hasMounted.current === true) return;
    console.log("Mount on component");
  }, [hasMounted]);

  return (
    <p>Hello!</p>
  );
}