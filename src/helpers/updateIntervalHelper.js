export const getTimeDifferenceText = (differenceInSeconds) => {
	if (differenceInSeconds < 10)
		return 'just now';
	if (differenceInSeconds < 60)
		return `${differenceInSeconds} seconds ago`
	if (differenceInSeconds < 120)
		return 'a minute ago';

	const differenceInMinutes = Math.round(differenceInSeconds / 60);
	if (differenceInMinutes < 60)
		return `${differenceInMinutes} minutes ago`;
	if (differenceInMinutes < 120)
		return 'an hour ago';

	const differenceInHours = Math.round(differenceInMinutes / 60);
	if (differenceInHours < 48)
		return `${differenceInHours} hours ago`

	return `${Math.round(differenceInHours / 24)} days ago`;
}
