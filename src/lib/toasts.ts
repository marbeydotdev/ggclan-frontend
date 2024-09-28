import toastify from 'toastify-js';
import { browser } from '$app/environment';

export enum toastType {
	Info = 'info',
	Success = 'success',
	Warning = 'warning',
	Error = 'error'
}

const background = {
	info: 'hsl(150deg 30% 60%)',
	success: 'hsl(150deg 30% 60%)',
	warning: 'hsl(150deg 30% 60%)',
	error: 'hsl(150deg 30% 60%)'
};

export function toast(text: string, toastType: toastType) {
	if (!browser) {
		return;
	}

	toastify({
		text: text,
		style: {
			background: background[toastType]
		},
		gravity: 'bottom',
		position: 'right',
		duration: 3000
	}).showToast();
}
