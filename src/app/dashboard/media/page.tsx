import MediaView from '@/app/dashboard/media/_media_components/MediaView'
import { supabase } from '@/utils/supabase'

export default async function Media() {
	const { data, error } = await supabase
		.from('photo_refs')
		.select(`
			id,
			name,
			image_url,
			image_key,
			size
		`)
		.order('created_at', { ascending: false })

	if (error) {
		throw Error("Error fetching media")
	}

  return (
    <section>
			<MediaView media={data} />
    </section>
  )
}
