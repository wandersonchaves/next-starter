'use client';

import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return <p className="p-4 text-red-500">Carregando sessão...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl">Olá, {session.user?.name}</h1>
      <p>
        Você está logado como:{' '}
        <strong>{session.user?.role ?? 'Desconhecido'}</strong>
      </p>
    </div>
  );
}
