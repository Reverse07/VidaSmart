import Hero            from '@/components/home/Hero'
import CategorySplit   from '@/components/home/CategorySplit'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import ProblemSolution from '@/components/home/ProblemSolution'
import FeaturedProduct from '@/components/home/FeaturedProduct'
import Testimonials    from '@/components/home/Testimonials'
import TrustBar        from '@/components/home/TrustBar'
import HomeCTA         from '@/components/home/HomeCTA'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <CategorySplit />
      <FeaturedProducts />
      <ProblemSolution />
      <FeaturedProduct />
      <Testimonials />
      <TrustBar />
      <HomeCTA />
    </div>
  )
}