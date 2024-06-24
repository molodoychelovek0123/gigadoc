import Link from 'next/link';

export default function Contact() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Контакты
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Посетите мое портфолио на{' '}
                        <Link href="https://hireme.studiobox.dev">
                            <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                hireme.studiobox.dev
                            </span>
                        </Link>
                    </p>
                </div>
                <div className="mt-8 text-center text-gray-700">
                    <p>Вы можете связаться со мной по следующим контактам:</p>
                    <ul className="mt-4 space-y-2">
                        <li>Email: boxdeveloper@studiobox.dev</li>
                        <li>
                            GitHub:{' '}
                            <a
                                href="https://github.com/molodoychelovek0123"
                                className="text-indigo-600 hover:text-indigo-500"
                            >
                                molodoychelovek0123
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}