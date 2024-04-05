import { getAllNeeds, getDisasterById, setNeedStatus} from './fetch-disaster-data.js';

const NEED_STATUS = { 
    IN_WAREHOUSE: 'in_warehouse',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered'
};

document.addEventListener('DOMContentLoaded', async function() {
    let needs = await getAllNeeds()
    for (const need of needs){
        await addNeedsRow(need)
    }
})


// Wondering why we use jquery here: "<td id="quantity-${need.id}" data-need_id="${need.need.id}">${need.quantity_filled}</td>""
async function addNeedsRow(need){
    let disaster = await getDisasterById(need.disaster_id)
    disaster = disaster[0]
    if (!disaster) return
    if (!disaster.city) return
    if (!disaster.type) return
    console.log(need.status)
    if(need.status == NEED_STATUS.IN_WAREHOUSE || need.status == NEED_STATUS.IN_TRANSIT) {
        let dataCells = `<tr scope="row" class="need-row-${need.id}">
                            <td>${need.name}</td>
                            <td id="quantity-${need.id}" data-need_id="${need.id}">${need.quantity_filled}</td>
                            <td id="warehouse-${need.id}" data-need_id="${need.id}">${need.warehouse}</td>
                            <td id="destination-${need.id}" data-need_id="${need.id}">${disaster.city}</td>
                            <td id="disaster-${need.id}" data-need_id="${need.id}">${disaster.type}</td>
                            <td>
                                <button type="button" class="btn btn-primary" data-need_id="${need.id}" id="pick-up-${need.id}">Pick Up</button>
                                <button type="button" class="btn btn-success" data-need_id="${need.id}" id="deliver-${need.id}">Mark Delivered</button>
                            </td>
                        </tr>`
                   
        $('#needs-table').append(dataCells)
        updateButtons(need)

        $(`#pick-up-${need.id}`).on('click', async function() {
            await updatePage(need, NEED_STATUS.IN_TRANSIT)
        })

        $(`#deliver-${need.id}`).on('click', async function() {
            await updatePage(need, NEED_STATUS.DELIVERED)
        })
    }
}

function updateButtons(need) {
    if (need.status == NEED_STATUS.IN_WAREHOUSE) {
        $(`#deliver-${need.id}`).prop('disabled', true)
        $(`#pick-up-${need.id}`).prop('disabled', false)
    } else if (need.status == NEED_STATUS.IN_TRANSIT) {
        $(`#deliver-${need.id}`).prop('disabled', false)
        $(`#pick-up-${need.id}`).prop('disabled', true)
    }
}

 async function updatePage(need, status) {
    try {
        await setNeedStatus(need, status)
        updateButtons(need)
        if (status == NEED_STATUS.DELIVERED) {
            location.reload()
        }
    } catch(error){
        console.log(error)
    }
}