import { DateTime } from 'luxon'

// Copied from: https://github.com/moment/luxon/issues/274#issuecomment-729126515
export function getTimeAgo(date) {
    const UNITS = [
        'year',
        'month',
        'week',
        'day',
        'hour',
        'minute'
    ];

    let dateTime = DateTime.fromISO(date)
    const diff = dateTime.diffNow().shiftTo(...UNITS);
    const unit = UNITS.find((unit) => diff.get(unit) !== 0) || 'second';

    const relativeFormatter = new Intl.RelativeTimeFormat('en', {
        numeric: 'auto',
    });
    return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
}