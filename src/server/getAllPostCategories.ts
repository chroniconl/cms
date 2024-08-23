import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'server.getAllPostCategories',
  httpMethod: 'GET',
})

export async function getAllPostCategories() {
  const start = performance.now()

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, color', { count: 'exact' })

  if (error) {
    void logger.logDatabaseError(error)
    throw Error()
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })

  return data
}
