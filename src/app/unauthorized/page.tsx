export default function UnauthorizedPage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-red-600">Acesso negado</h1>
      <p className="text-gray-600">
        Você não tem permissão para acessar esta página.
      </p>
    </div>
  );
}
