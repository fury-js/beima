import { useEffect, useState } from "react";

function useSaveOnIpfs(address) {
  const fileReader = new FileReader();
  
  const [shortForm, setShortForm] = useState("*****");
  if (!address) address = shortForm;
  useEffect(() => {}, [address]);

  return shortForm;
}

export { useSaveOnIpfs };
