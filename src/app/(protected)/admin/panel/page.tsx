import { RoleGuard } from '@/components/RoleGuard';

export default function AdminPanel() {
  return (
    <RoleGuard allowedRoles={['ADMIN']}>
      <h1>Área administrativa</h1>
    </RoleGuard>
  );
}
