export function balanceCard(data: { Total_Earend: any; Total_Invested: any; total_withdraws: any; }) {


    return [
        {
            title: 'ROI',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox = "0 0 24 24" width="30" height="30" ><path fill="none" d = "M0 0H24V24H0z" /><path fill="#FFD700" d = "M5 3v16h16v2H3V3h2zm15.293 3.293l1.414 1.414L16 13.414l-3-2.999-4.293 4.292-1.414-1.414L13 7.586l3 2.999 4.293-4.292z" /></svg>',
            amount: Math.round(data.Total_Earend)
        },
        {
            title: 'Referals',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox = "0 0 24 24" width="30" height="30" ><path fill="none" d = "M0 0h24v24H0z" /><path fill="#FFD700" d = "M12 11a5 5 0 0 1 5 5v6h-2v-6a3 3 0 0 0-2.824-2.995L12 13a3 3 0 0 0-2.995 2.824L9 16v6H7v-6a5 5 0 0 1 5-5zm-6.5 3c.279 0 .55.033.81.094a5.947 5.947 0 0 0-.301 1.575L6 16v.086a1.492 1.492 0 0 0-.356-.08L5.5 16a1.5 1.5 0 0 0-1.493 1.356L4 17.5V22H2v-4.5A3.5 3.5 0 0 1 5.5 14zm13 0a3.5 3.5 0 0 1 3.5 3.5V22h-2v-4.5a1.5 1.5 0 0 0-1.356-1.493L18.5 16c-.175 0-.343.03-.5.085V16c0-.666-.108-1.306-.309-1.904.259-.063.53-.096.809-.096zm-13-6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm13 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm-13 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm13 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zM12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /></svg>',
            amount: 0.00
        },
        {
            title: 'Total Investments',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox = "0 0 24 24" width="30" height="30" ><path fill="none" d = "M0 0h24v24H0z" /><path fill="#FFD700" d = "M17 16h2V4H9v2h8v10zm0 2v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3zM5.003 8L5 20h10V8H5.003zM7 16h4.5a.5.5 0 1 0 0-1h-3a2.5 2.5 0 1 1 0-5H9V9h2v1h2v2H8.5a.5.5 0 1 0 0 1h3a2.5 2.5 0 1 1 0 5H11v1H9v-1H7v-2z" /></svg>',
            amount: Math.floor(data.Total_Invested)
        },
        {
            title: 'Payouts',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox = "0 0 24 24" width="30" height="30" ><path fill="none" d = "M0 0h24v24H0z" /><path fill="#FFD700" d = "M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z" /></svg>',
            amount: Math.floor(data.total_withdraws)
        }
    ]
}

