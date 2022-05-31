import { SongData  } from '@/types/store/player'
import { songInterface } from '@/types/public'
export function formatSheet(item: songInterface) :SongData {
	return { 
		dt: item.duration,
		url: '',
		name: item.name,
		id: item.id,
		ar: item.artists || [],
		al: item.album || {}
	}
}