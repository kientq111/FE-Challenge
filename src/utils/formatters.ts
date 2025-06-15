export const formatDate = (dateString: string): string => {
    if (!dateString || dateString === '') return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${minutes}m`;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}m`;
};

export const formatVoteAverage = (voteAverage: number): string => {
    return voteAverage?.toFixed(1);
};

export const formatCurrency = (amount: number): string => {
    if (amount >= 1_000_000_000) {
        return `$${(amount / 1_000_000_000)?.toFixed(1)}B`;
    } else if (amount >= 1_000_000) {
        return `$${(amount / 1_000_000)?.toFixed(1)}M`;
    } else if (amount >= 1_000) {
        return `$${(amount / 1_000)?.toFixed(0)}K`;
    } else {
        return `$${amount?.toLocaleString()}`;
    }
};