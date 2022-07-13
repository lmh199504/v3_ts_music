import type { SongData  } from '@/types/store/player'
import type { songInterface } from '@/types/public'
import { MusicType } from '@/types/store/player'
export function formatSheet(item: songInterface, type?: MusicType) :SongData {
	return { 
		dt: item.duration,
		url: '',
		name: item.name,
		id: item.id,
		ar: item.artists || [],
		al: item.album || {},
		type: type || MusicType.song
	}
}