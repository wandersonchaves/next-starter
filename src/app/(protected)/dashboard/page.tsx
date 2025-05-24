'use client';

import { useRoleGuard } from '@/hooks/use-role-guard';

export default function DashboardPage() {
  const { session, loading } = useRoleGuard({
    allowedRoles: ['USER', 'ADMIN'],
  });

  if (loading) return <p className="p-4">Carregando sessão...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl">Olá, {session?.user?.name}</h1>
      <p>
        Você está logado como: <strong>{session?.user?.role}</strong>
      </p>
    </div>
  );
}
