export interface SongData{
	url: string;
	name: string;
	id: number;
	ar: Array<arData>;
	al: alData;
}

export interface alData{
	id: number;
	name: string;
	pic: number;
	picUrl: string;
	pic_str: string
	tns?: Array<any>
}

export interface arData{
	id: number;
	name: string;
}