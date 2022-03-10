import useTranslation from 'next-translate/useTranslation'
import dynamic from 'next/dynamic'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import NewsletterForm from '@/components/NewsletterForm'
import Card from '@/components/Card'
import EmblaCarousel from '@/components/carousel/EmblaCarousel'

const HeroEffect = dynamic(() => import('@/components/HeroEffect'), { ssr: false })
const UnchartedRing = dynamic(() => import('@/components/UnchartedRing'), { ssr: false })

const MAX_DISPLAY = 3
const SLIDE_COUNT = 3
const slides = Array.from(Array(SLIDE_COUNT).keys())

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('blog', otherLocale)

  return { props: { posts, locale, availableLocales: locales } }
}

export default function Home({ posts, locale, availableLocales }) {
  const { t } = useTranslation()

  return (
    <>
      <PageSEO
        title={siteMetadata.title[locale]}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div className="relative pb-1 pt-2 text-center sm:pb-1 sm:pt-3">
        <div className="absolute inset-x-0 top-0 -z-20 m-auto h-full">
          <HeroEffect />
        </div>
        <div className="h-52">
          <UnchartedRing />
        </div>
        <h1 className="py-3 pb-10 text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:pb-10 sm:text-4xl sm:leading-10 md:text-5xl xl:text-6xl md:leading-14">
          <span className="animate-fade-text">FORENA </span>
          <span> 스마트홈 </span> <span className="animate-fade-text"> 서비스 </span>
        </h1>
        <p className="px-2 text-xl font-bold leading-6 text-gray-900 dark:text-gray-100 sm:px-6 xl:px-0">
          {t('common:mini-bio')}
        </p>
      </div>
      <div>
        <div>
          <EmblaCarousel slides={slides} />
          <div className="pb-2 w-full flex flex-wrap">
            <Card
              title={t('common:learning')}
              description={t('learning:description')}
              href={'/learning'}
              className="py-4 md:px-4"
            />
            <Card
              title={t('common:about')}
              description={t('common:about-description')}
              href={'/about'}
              className="py-4 md:px-4"
            />
          </div>
          <ul className="divide-y divide-transparent md:px-4">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <li key={slug} className="pt-12 pb-6">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-3 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">{t('common:pub')}</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-2">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`https://forena-user-manual.s3.ap-northeast-2.amazonaws.com/FORENA_App_Manual_v1.0.pdf`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read "${title}"`}
                          >
                            {t('common:more')} &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="all posts"
            >
              {t('common:all')} &rarr;
            </Link>
          </div>
        )}
        {siteMetadata.newsletter.provider !== '' && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm title={t('newsletter:title')} />
          </div>
        )}
      </div>
    </>
  )
}
