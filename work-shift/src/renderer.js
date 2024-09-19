const fetch_xlsx = async () => {
    const raw_data = await window.versions.fetch_xlsx();
    console.log(raw_data);
    
}

fetch_xlsx();