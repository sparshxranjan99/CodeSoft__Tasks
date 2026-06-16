const el = document.getElementById('out');

function v(val) {
    if (val === '') el.value = '';
    else if (val === 'b') el.value = el.value.slice(0, -1);
    else if (val === '=') { 
        try { el.value = eval(el.value) || ''; } catch { el.value = 'Error'; } 
    }
    else el.value += val;
}