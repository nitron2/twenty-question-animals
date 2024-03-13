const express = require('express');

document.addEventListener('DOMContentLoaded', function() {
    console.log('The DOM is fully loaded and parsed, but external resources like images and stylesheets may not have loaded yet.')
    fetch('http://127.0.0.1:5001/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']))
    loadHTMLTable([])
});

function loadHTMLTable(data) {
    const tableBody = document.querySelector('table tbody')

    if (data.length === 0) {
        tableBody.innerHTML =  "<tr><td class = 'no-data' colspan='5'>No Data</td><tr>"
    }
}