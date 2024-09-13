const fetch_xlsx = async () => {
    const data = await window.versions.fetch_xlsx();
    console.log('fetch_xlsx');
    console.log(data)
}

fetch_xlsx();