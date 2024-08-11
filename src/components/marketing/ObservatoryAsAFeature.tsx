import { Check } from 'lucide-react'

export const ObservatoryAsAFeature = () => {
  return (
    <section className="py-24">
      <div className="mx-auto flex max-w-7xl flex-col px-5 sm:px-10 md:flex-row md:px-12 lg:px-5">
        <div className=" text-gray-700 dark:text-gray-300 md:w-1/2">
          <span className="mb-2 inline-block rounded-md border border-emerald-600 bg-emerald-800/30 px-4 py-1 text-sm text-white">
            The Observatory (Beta)
          </span>
          <h1 className="mb-8 text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
            Unstructured data into structured data
          </h1>
          <p>
            All good web research starts in the raw HTML contents. Submit any
            publicly available URL and our system will provide an easy-to-use
            interface for various tasks including research, data extraction, AI
            consultation and more, making it the ideal starting point.
          </p>
          <ul className="mt-16 space-y-4">
            <li className="flex items-center gap-x-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-emerald-700 text-sm text-white shadow-sm shadow-emerald-600 dark:border-emerald-600">
                <Check className="h-5 w-5 text-emerald-400" />
              </span>
              Enter any URL to instantly retrieve the full HTML content of the
              page.
            </li>
            <li className="flex items-center gap-x-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-emerald-700 text-sm text-white shadow-sm shadow-emerald-600 dark:border-emerald-600">
                <Check className="h-5 w-5 text-emerald-400" />
              </span>
              Choose to what part of the HTML content you want to work with
            </li>
            <li className="flex items-center gap-x-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-emerald-700 text-sm text-white shadow-sm shadow-emerald-600 dark:border-emerald-600">
                <Check className="h-5 w-5 text-emerald-400" />
              </span>
              Interact with the HTML content to achieve specific research tasks
            </li>
          </ul>
        </div>
        <div className="flex md:flex-1">
          <img
            src="/images/working-on-housing-project.jpg"
            alt="working on housing"
            width="1300"
            className="w-full rounded-lg object-cover md:h-full"
          />
        </div>
      </div>
    </section>
  )
}
