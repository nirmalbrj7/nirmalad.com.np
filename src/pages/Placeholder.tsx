export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold font-serif text-slate-900 mb-6">{title}</h1>
            <div className="bg-white shadow rounded-lg p-8 border border-slate-200 h-96 flex items-center justify-center">
                <p className="text-slate-500 text-lg">Content for {title} coming soon...</p>
            </div>
        </div>
    );
}
