"use client";

import { useState } from "react";

export default function BotaoCopiarLink({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {

        navigator.clipboard.writeText(location.href);
        setCopiado(true);
      }}
    >
      {copiado ? `✓ Link de “${titulo}” copiado` : "🔗 Copiar link"}
    </button>
  );
}