import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data, error } = await supabase.from('products').select('*')
  
  if (error) {
    return <div>❌ Error: {error.message}</div>
  }

  return <div>✅ Supabase conectado — {data.length} productos en BD</div>
}