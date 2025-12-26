import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl mb-4">404</h1>
      <p className="text-gray-600 mb-8">Страница не найдена</p>
      <Link
        to="/"
        className="text-[#6d28d9] hover:opacity-80 transition-opacity"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
