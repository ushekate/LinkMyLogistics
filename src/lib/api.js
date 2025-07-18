import pbclient from "./db";

export async function fetchCFSData({placeType, tariffPriceRange, freeDays, monthlyDues, containers}) {
    let filter = "";
	switch (placeType) {
		case 'Tariff Rates':
			filter = `tariffRate >= ${tariffPriceRange.min} && tariffRate <= ${tariffPriceRange.max}`;
			break;
		case 'Free Days':
			filter = `freeDays = ${parseInt(freeDays)}`;
			break;
		case 'Monthly Dues':
			filter = `monthlyDue >= ${monthlyDues.min} && monthlyDue <= ${monthlyDues.max}`;
			break;
		case 'Containers':
			filter = `containerCapacity >= ${containers.min} && containerCapacity <= ${containers.max}`;
			break;
		default:
			break;
	}

    // const records = await pbclient.collection('cfsProviders').getFullList({
    //     filter,
    // }) ;
    return await pbclient.collection('cfsProviders').getFullList({
        filter,
    }) ;

}