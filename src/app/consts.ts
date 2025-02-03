import { StaticImageData } from 'next/image';

// Static image imports
import a from '@/pictures/0058C800-6733-49C6-9C4D-15B5F7D8BACC_1_105_c 1.png';
import b from '@/pictures/040F9AF1-3A56-4959-B95C-6403BEF02260_1_105_c 1.png';
import c from '@/pictures/5B43691F-EC48-4E93-9AED-288EE5048CFE_1_105_c 1.png';
import d from '@/pictures/5EB4ECB4-2A23-4D59-9547-E0079239AF05_1_105_c 1.png';
import e from '@/pictures/7145355B-04AB-4278-AD41-944C8CFDFDDB_1_105_c 1.png';
import f from '@/pictures/7442E549-23F1-447A-BB9D-52820A49CB45_1_105_c 1.png';
import g from '@/pictures/7763A72A-99CB-4D32-A547-802E77AF7182_1_105_c 1.png';
import h from '@/pictures/9CD43318-0ABC-4B37-92A1-C5B77510CB54_1_105_c 1.png';
import i from '@/pictures/C45A16DC-4C12-429D-9257-AFEBFC0C4D4B_1_105_c 1.png';
import j from '@/pictures/E4E5227F-4A0D-4241-BBAC-DE5282A9FB2B_1_105_c 1.png';
import k from '@/pictures/F4D99F5E-0BA1-4BAA-B29C-CA4AD0094041_1_105_c 1.png';
import l from '@/pictures/FB00FCAD-50E2-4296-92E7-D95624DC1FA1_1_105_c 1.png';


export const pictures = [a, b, c, d, e, f, g, h, i, j, k, l];

export function getPicturesInRandomOrder(): StaticImageData[] {
    return pictures.sort(() => Math.random() - 0.5);
}
