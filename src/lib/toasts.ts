import toastify from 'toastify-js';
import { browser } from '$app/environment';

export enum toastType {
	Info = 'info',
	Success = 'success',
	Warning = 'warning',
	Error = 'error'
}

const background = {
	info: 'hsl(150deg 0% 60%)',
	success: 'hsl(140deg 60% 60%)',
	warning: 'hsl(35deg 90% 60%)',
	error: 'hsl(10deg 90% 60%)'
};

export function toast(text: string, toastType: toastType) {
	if (!browser) {
		return;
	}

	toastify({
		text: text,
		style: {
			background: background[toastType],
			borderRadius: '1000rem'
		},
		gravity: 'bottom',
		position: 'right',
		duration: 3000
	}).showToast();
}
