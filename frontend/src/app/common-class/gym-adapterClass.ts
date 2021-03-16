import * as moment from "moment";

export class GymAdapterClass {


static getNicNumber(NICNo , day) {

}
static getGRNItemDocumentDefinition(data){
      




}
static getGRNDocumentDefinition(data){
  var responsedata = data.response;
    

  //return;
  return {
    content: [
      {
        columns: [
          {
            image:
              'data:image/png;base64,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',
            width: 150,
          },
          [
            {
              text: `${data.reportName}`,
              color: '#333333',
              width: '*',
              fontSize: 28,
              bold: true,
              alignment: 'right',
              margin: [0, 0, 0, 15],
            },
            {
              stack: [
                {
                  columns: [
                    {
                      text: 'From date :',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: `${data.fromDate}`,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'To date :',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: `${data.toDate}`,// `${data.paymentDate}`,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'User Name :',
                      color: '#aaaaab',
                      bold: true,
                      fontSize: 12,
                      alignment: 'right',
                      width: '*',
                    },
                    this.getPaidStatus(data.invoicePrinted)
                  
                  ],
                },
              ],
            },
          ],
        ],
      },
      {
        columns: [
          {
            text: 'Recipt owner details',
            color: '#aaaaab',
            bold: true,
            fontSize: 14,
            alignment: 'left',
            margin: [0, 20, 0, 5],
          }
        ],
      },
      {
        columns: [
          {
            text: `${data.userId}\n${data.clientName}\n ${data.email}`,
            bold: true,
            color: '#333333',
            alignment: 'left',
          },
          
        ],
      },
      {
        columns: [
          {
            text: 'Note',
            color: 'red',
            bold: true,
            margin: [0, 7, 0, 3],
          },
        ],
      },
      {
        columns: [
          {
            text: `Hi ${data.generateduser} show this recipt to casier and get your items`,
            style: 'invoiceBillingAddress',
          }
         
        ],
      },
      '\n\n',
      
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function(i, node) {
            return 1;
          },
          vLineWidth: function(i, node) {
            return 1;
          },
          hLineColor: function(i, node) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function(i, node) {
            return '#eaeaea';
          },
          hLineStyle: function(i, node) {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function(i, node) {
            return 10;
          },
          paddingRight: function(i, node) {
            return 10;
          },
          paddingTop: function(i, node) {
            return 2;
          },
          paddingBottom: function(i, node) {
            return 2;
          },
          fillColor: function(rowIndex, node, columnIndex) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['auto','auto','auto','auto','auto', 20],
          body: [
            [
              {
                text: 'DATE',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'ID',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'PURCHASEORDER ID',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'SUPPLIER NAME',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
             
              {
                text: 'GRN AMOUNT',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              }
            ],
            
            ...responsedata.map((cart)=>{
              return [
                 moment(cart.date).format('L'),
                cart.grnId,
                cart.purchaseOrderId,
                cart.supplierName,
                this.formatMoney(Number(cart.totalAmount)),
  
              ]
  
            })
  
  
          ],
        },
      },
      '\n',
      '\n\n',
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function(i, node) {
            return 1;
          },
          vLineWidth: function(i, node) {
            return 1;
          },
          hLineColor: function(i, node) {
            return '#eaeaea';
          },
          vLineColor: function(i, node) {
            return '#eaeaea';
          },
          hLineStyle: function(i, node) {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function(i, node) {
            return 10;
          },
          paddingRight: function(i, node) {
            return 10;
          },
          paddingTop: function(i, node) {
            return 3;
          },
          paddingBottom: function(i, node) {
            return 3;
          },
          fillColor: function(rowIndex, node, columnIndex) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['*', 'auto'],
          body: [
            
          
            [
              {
                text: 'SALE AMOUNT',
                bold: true,
                fontSize: 20,
                alignment: 'right',
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
              },
              {
                text: this.getSalesAmountTotal(responsedata ,'grnWithoutItem'),
                bold: true,
                fontSize: 20,
                alignment: 'right',
                border: [false, false, false, true],
                fillColor: '#f5f5f5',
                margin: [0, 5, 0, 5],
              },
            ],
          ],
        },
      },
      '\n\n',
     
    ],
    styles: {
      notesTitle: {
        fontSize: 10,
        bold: true,
        margin: [0, 50, 0, 3],
      },
      notesText: {
        fontSize: 10,
      },
    },
    defaultStyle: {
      columnGap: 20,
      //font: 'Quicksand',
    },
  };
}




static getItemDocumentDefinition(data){
  var response = data.responseData;
    

  //return;
  return {
    content: [
      {
        columns: [
          {
            image:
              'data:image/png;base64,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',
            width: 150,
          },
          [
            {
              text: `${data.reportName}`,
              color: '#333333',
              width: '*',
              fontSize: 28,
              bold: true,
              alignment: 'right',
              margin: [0, 0, 0, 15],
            },
            {
              stack: [
                {
                  columns: [
                    {
                      text: 'From date :',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: `${data.fromDate}`,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'To date :',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: `${data.toDate}`,// `${data.paymentDate}`,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'User Name :',
                      color: '#aaaaab',
                      bold: true,
                      fontSize: 12,
                      alignment: 'right',
                      width: '*',
                    },
                    this.getPaidStatus(data.invoicePrinted)
                  
                  ],
                },
              ],
            },
          ],
        ],
      },
      {
        columns: [
          {
            text: 'Recipt owner details',
            color: '#aaaaab',
            bold: true,
            fontSize: 14,
            alignment: 'left',
            margin: [0, 20, 0, 5],
          }
        ],
      },
      {
        columns: [
          {
            text: `${data.userId}\n${data.clientName}\n ${data.email}`,
            bold: true,
            color: '#333333',
            alignment: 'left',
          },
          
        ],
      },
      {
        columns: [
          {
            text: 'Note',
            color: 'red',
            bold: true,
            margin: [0, 7, 0, 3],
          },
        ],
      },
      {
        columns: [
          {
            text: `Hi ${data.generateduser} show this recipt to casier and get your items`,
            style: 'invoiceBillingAddress',
          }
         
        ],
      },
      '\n\n',
      
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function(i, node) {
            return 1;
          },
          vLineWidth: function(i, node) {
            return 1;
          },
          hLineColor: function(i, node) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function(i, node) {
            return '#eaeaea';
          },
          hLineStyle: function(i, node) {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function(i, node) {
            return 10;
          },
          paddingRight: function(i, node) {
            return 10;
          },
          paddingTop: function(i, node) {
            return 2;
          },
          paddingBottom: function(i, node) {
            return 2;
          },
          fillColor: function(rowIndex, node, columnIndex) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['auto','auto','auto','auto','auto','auto', 20],
          body: [
            [
              {
                text: 'DATE',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'ID',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'NAME',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'QUANTITY',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'SALE QUANTITY',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'SELLING TOTAL',
                border: [false, true, false, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
            ],
            
            ...response.map((cart)=>{
              return [
                cart.paymentDate,
                cart.itemId,
                cart.itemName,
                cart.avlQty,
                cart.deductQty,
                this.formatMoney( cart.deductQty*cart.sellingPrice),
  
              ]
  
            })
  
  
          ],
        },
      },
      '\n',
      '\n\n',
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function(i, node) {
            return 1;
          },
          vLineWidth: function(i, node) {
            return 1;
          },
          hLineColor: function(i, node) {
            return '#eaeaea';
          },
          vLineColor: function(i, node) {
            return '#eaeaea';
          },
          hLineStyle: function(i, node) {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function(i, node) {
            return 10;
          },
          paddingRight: function(i, node) {
            return 10;
          },
          paddingTop: function(i, node) {
            return 3;
          },
          paddingBottom: function(i, node) {
            return 3;
          },
          fillColor: function(rowIndex, node, columnIndex) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['*', 'auto'],
          body: [
            
          
            [
              {
                text: 'SALE AMOUNT',
                bold: true,
                fontSize: 20,
                alignment: 'right',
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
              },
              {
                text: this.getSalesAmountTotal(response),
                bold: true,
                fontSize: 20,
                alignment: 'right',
                border: [false, false, false, true],
                fillColor: '#f5f5f5',
                margin: [0, 5, 0, 5],
              },
            ],
          ],
        },
      },
      '\n\n',
     
    ],
    styles: {
      notesTitle: {
        fontSize: 10,
        bold: true,
        margin: [0, 50, 0, 3],
      },
      notesText: {
        fontSize: 10,
      },
    },
    defaultStyle: {
      columnGap: 20,
      //font: 'Quicksand',
    },
  };
}

static  getDocumentDefinition(data){
    // try here http://pdfmake.org/playground.html
    
    var cartValue = data.CartValues;
    

    //return;
    return {
      content: [
        {
          columns: [
            {
              image:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7Z15lGRFne8/EXfLtbaurm66abvZFwHpbhQaoVFcwHGZGUaPoz6URWYc6z2eOMeFGfWJPpBxFkcdjkshMKCOjuKCOqPHBZWlUNlE9r2b3rurKivXu0a8P7KqK7Mqs/JmVlZRzJvvOfdU5b1xI+Le+N1f/OK3hdBasxzwrnf99cYI9REBbwJMAM93KRYKWKZNT2/vwbIaHpJCfO7GG/7py43qGh0ZHhKGfbplmseBOFRIsQrESiHEgBByQEijX0phC6RRfXqt0DpUWvugXbQuoylqdB70NqWjW1H6e5vO//TeJXgVvOtd7ztDweUgzgUkgOtWKJWK2LZDNttzsKxA3KOF/sxNN3zma520JZYLAZz/rsvuAk6tPdeMAKYhtDrxxhs/++DoyPBhwJlTx1bg6PnaEtLASWaxLKetPmoV+UpFe5VWj6DUbWh1y8bzP/1AW5W0wBVXXCGffHrySdCH1Z5vRgBTiHQUbfjqVz+3o932zIV0tlu44IJLjwDjVAAhwEk4+F4wp1ztNaUUR63iW6Mjw1lgbTvtaRXhlnLI7ACGYcW+T0jDNqSxzoB1wGuBTz7wzY+5Kox+E+noc5v/x9XfaacfjfDEM7ktAg4DQTJh4/nVZ53VExJJG98PUJECMJDmW4F/bLe9ZUEAgTCycooR9ff3kk6nUJHimW3b68pNX4uUYveufViSYxfUrlfBSMUngEaQ0kxI2zzLhLMe+Ob/CaIouFdo9eXB47becOimP5o9ci0hhMiiNStW9JFKJYgixa5d++rK1F7bvXsvWoMQOttR/zu5aTGRSCQAkIbEse2G1wwpse2FDRyAiuZymYVASsOyrMSppp36ysQTv/Hv+/rf3HX/jR/c2EldiUT12Q1DYllm02u2tbD3sOQc4NJLL3VyOfkKrUUyDMOUF7gnGqZpJZzE3MJicfsSqRCtFEJ2/zsQ0jAsaZyKxb33/9vfPq7C6P2bzr/6R/ErmHn4Oa9BzH0xkYqOOu/Nl3zKMMwdCTuxU0qhg0Dd9fWv//O8guuSEsA733nZeVoYX0IwiAAhq8KNbdteQwJYbGhwK3kS6V7EIlKbaTpHY+of3v9vH92jw+CKjedf/cVut6Gi6OWuW3l7KpUGCQqNYYng/Hdd9vmb/vUzf93sviWdArTg45ZpDvb19ZBKJQ+eF4v+rTdHGHiU8+N4bpHALxN4lUU6XHQUrkaIL9z9rx947M5rL33tYj2TZZv09/eSTDgW8L53XPz+w5uVXTIO8M53fmAIwYl9/T0kEtXlV7lcBkBK7PnuXWwoFeK74VI2ebSAn4yODN8MXLblkmue62blAwN92JZFOp1k1659UkT61UBDncmScQDDEBLANGdozjKXxSLk+cSfAY+Ojgz/zejIcNc+AntKaBRCYBoGqObjvOxWAVEUTf2nCcOo6bUoanuFtVyRAq4EHhwdGT5r+mQU1jyrmvUeat5LOEdH0B6WjABStjbilMtN5Km4HrlcgTAMY1/7L4CjgF+ccVj4ToCJiUncisdELj+H2CcmJqm4HhMT+Tpi6ARLwoNHR4YP/5MTxS03/q71mtXzfbz9421f+y8C2ZfUbwPwPJ/9XpP34HXvPSw6BxgdGd4C3CUlLwbq1JrRAtnXfAiX+QyxmP2b4Ri65TteVA4wOjL8ZuAm4OAifzJfoK+3B9/zCfzuauKmceuTJo/tlRy5UvHqo5fXVOGH8N0/WORdwdYjQo4Z6j4l5HIFenuzVCoVoiiaV8exKARwxRVXpDYPTH40aZofYmqNXwmrnXArHnsq+7vSTqgF5bD+EYqe4JE91bYe3yd58SEmvclGdz8/eHyfYKxU7d/dz5msG6gnAC/qVCUiDr6IcrlCuVw5eMU0jRWXX371htl3XH31h7d13Rw8OjJsPlPI/vDB8YFzas+rSLFzV71WMgpDcpMTOI5DJjPHxNnSHJzJpOjvrz/vBwF79xw4+Hto1SBOF+wG3UI+X2JyMg9Udflr1qyqu+66HvsbzO8tzMForRgfHyOVSpNMpuquDfT3ks6k5tzjWJVkV2WAKdPsD5JmdE7Lwv+NZYGuTQGjI8OHAj8EXtKtOv8bi4+uEMDoyHA/8HOmPHEsoeix6gW8UM4z1XQ47dlybjuuDqmdaNJmyAJN/l2FZ8ys24VgTv9lh+t6rXUANHxSpfQOYKzRpQUTwOjIsAV8hxo3rBUJl7PW7KorVw4Ej21rPBKSzuSQQ1JlzlqTrzt3oCR4asdMO5sGD7Aqu3zWhPcqg33jVZ2YLdWc97Q9J9m2u/1hiaJoF7C+0bXJXOHKz3/uioYWyG5wgC8Cr+hCPS9QiPb8CYSc9bNeQSoa2PoXEwsigNGR4Q8BF8Up6/oKpRRyEZwvng9IaZBI9WCYFu3MYY7jAtUlmhCSTE9/3fWEFwKF7nUU8DzvkGbXOh6N0ZHh84BPxS0faYHrup02t7wgBMl0H4Zp8zy6MsRCFIb4gX9ks+sdcYDRkeFTqGr42nr6SqVEEHg4TgIE0x6tqOXhmR4bpmkjjeVlyjaE7gUIwwDXq3KYMAjwPJ+E4zQdp7afYmq5dwtVM2bbCMOQMCzWnavqrjXtfk0Vf2GWsI4hFm8ay1c6VF1r1Qfg+z6+78e+ra0nGR0ZTlBd6zedUzqF73ltldca9k60d0+3oMLFsWEATBYDgqC9+pXWeG3eM412OcCH6FDRk7Dm5/PFUgErCKqu4FOS8LRDiNYKP5ih6igMcd0Kib7nZ4GvVIjnFnESmUWpP5+fxEk42Fbtu6hyhtnvosrmXaruf42hoantODYBjI4MHw58OG752cg6gt6MzWSxMXvSGnzPxffmCophFFLIT3ba9KLAd0tEgY9pOW0tA2e8mgA0gV+pu16NVdB4rovXQGgOgoAgiP8uhJBaaOsTza63wwE+T41ZtxO86SUJ/vNBwVjeY5mEJC4IURQQtRlcEgYGUF37a61xy/lZ17untDJMc9Iyrc9859tf2NesTCwCGB0Z/hPgjxbaoQ2Dgr96RYLZdPToHsW3ftPdte//b1g3mODis2cUgaFf+e7J7/jUea3ua0kAoyPDKeCfF9a95pDS6Ng7WAiJk6yfh61QAzNfpeUkcZKtVxdaK6LAJ4qWlwNJpzAs509+e9PfrHvZ+VfN63Ie581/hCY65oXCtByS6V7MyUrrwg0ghMR20nXnLC+ijgDsJLYTyx8VEuBVCvheuaP+LCcIIYVt8O/AlvnKzSu9jI4MHwM0DStaEIQgkeoBBKv7OtOoDWS7vwpwkhmkjEkwi4DVPZ1pFocavAvDck6798bLT21Q/CBaia//AosTtWMYJmJKoTKYNRnsbU++FELwuk0Di9AzMaXifX6wYVCQTrRH2FJKXvOSBgk0EEjLmDdzSNMpYHRk+Fzg1W31pA3IWYkZLn39ofz0/gke3lFCTZmHg1Dj+QGGIUjWrHMHszav2zjAiswiqWN1983HQhpYdgLTgukpShzkgvW49HUZfvZgmaf2Vg4ayoMgwgsiTMMgUTOlre51OHfjAAm7MdcyTfuIe7/2oTdvesfffbvh9Xn6/FdxHqwzCCy7/otPWII3vnSAN750Mb7q+NAqIgzjq1LjwDRtkpk+QGAYLjMyisCy53qs9tvwltPTc853CsOwvwA0JICGU8DoyPA64PVd60ENhJAk0j1tpWZZKqgopFKapNuOsk4yy/NpNTQMa/Cer314uNG1Zhzg3UxrK5pASAMnkZpi5fEeTsCSW9Hc8iRlo/WAKq3RqvvGJSHksrAcGtK8DLhm9vk5HGB0ZNikSgBNIaVJOjuAZacwDAvDMGMdS/EioqDeQKSiiCgKWx6LMfhQ1fYtB7WnYViH3339R4Zmn280BbwRWDNfZU4yfVCCX25Yfmt4je93pufoJoQQwrDVJ2efbzSK72lV2XJgaY2glUIvggS/UPiVIr5X7rps0S6kYbxlzrnaH6Mjw0cAr2lVkYqeJ0eMFhBSLKqzRqfQaLxKgeLkfjyvNHNeKzy3uGRThGGY/fd97fLTa8/Nflt/QQyJzvdK0KEr9+Ki8bJq+WCuPOC7JcrlHEvzPgVCyDrT8EFePiX8XRinmigMKBcnsBMZDGk2ylrWRp8E3VwiVfULNet4Iea4WhsBaANUDGaxFGw7CnzCMMDsQANpuBFRIr7qWhrm1trftZP5RmBl3IqiMKBSnIjd8GxoDV4IbiAQhoFlJzGt5upgKSBpQ8Jqj8X3GhlW7yyRfq5I/7iPgThIsEprlBR4SYP8izKMv3gFuq5+TRSFeOVC23b/dqGiEFoQgL2vQurZHP3bS6RCfTDsW2tQAiIpKA06TBzbR3lNY28lKQ3rvps+/J7pVHW1BPDy7jxKYyjgrqcinj4gUNKhEkCkar9Mb+qYH6Yh6ElIhnoMjlljc+SQiWnM5SCHBAGvLuQ5+ZYSScci4cy4V01DCoHUYJYj0o9OsvqRSUo9FjvPPISgp2qgMgyLVKafUmEMtUhLRaCpYkxoTerRCXru2YtdDkmlHQxDUss1hagqbQylsfe59O/bQyhg37F9jL9kcG6dhnw31YCeOgI4fU7JLmBnTvOrR32ePeATRYq+vgGMBgM2F6Lq59ZgfilH8Phen0d3+1iG4Li1NmcckyDrVL/ercUi501MYACZbBLTjMc1hIBMIeDoH20nt8ph5yvWgpQgBJaTxKsUW1fSAUzLmQowqYezs0T/bc9hTnhYlkG6J758Y2pY80iOwcdy7Hz5akprZziCkOZRB8vV3NNVDqAUfPN3Pk/umVkDG1JiGK3nK2lIVq8anLesUooD+8fx/IAHtns8ustnyxEOW5/Zx+aJHACptBNv8B0H0lkIAigVEErRv88j+b1neOb1G4gcI7aJWEg5b3jXbP2Jk8jM8WkAyPzhAL137EJojWFKUukY1lIpIZ0By4FyEdwKtoINv97DruP7mJjiBoY0en5y09/b55z/Ad8EGB0ZXk8L5U87cEPNV37tMl6oN6o0ovJGSKeSLQlFSkk6k8IbrzpI+qHmV4+5POMneK+UrHBMbDuGvsIwYeXqmd+2DWPVDCYJX3PUd5/hqdevxzPnlwEM08RJ9mK00JHYs0LD7MTcwe+7bSeZBw9MPacgnU7EE7T7+iE19aWnUrBvD/geQsDaR3IkCj67z1gDQrBSHngT8O1pcuza1783D5//aXnO4EP8wEcvZu4gr8GeAtttm8+uWk0lFXMziFnZNEim6nQJJnDYf24jrJRoBiEkyXR/y8GPg+z9+w8OfrU7NlLGXCXNJqZU/e8VO8oM/KHqIS6Qb4CZKaAr8/+uCc0NdxSbJnEMgmAqt/389fiez/7946RSCZotET3XpVRuLDTuNk0+afTyiXKOTKtlnFcBagI0PW+OP4Ct4Ljbijx0VuOU/KbpkDzgkdpVwqxEmG6I6VYFRj9tEmQtvP4E3sD8RJl4rkDv6Ey4uDTEnFTx8z+LC8kaOaEyVy1+yENjuCtsCivtl0IXCUAp+OZvK/Nm8FQqwnXLc3LYNILrerhu55E/+4XkOifDpW4Lb+MggImxqgwQBlBo7HPfU4EV2z3GXlQdRMNXrHuoQs94RNLPI5tRdW6aE1brPVrDW7XmLmnzH1bN3j+Rov9X9Tu+OG16BjE5ASqqTmOlYpUgZkEgOPTOvTx63oYNAOLOL783A+RoYf5thZvvDXj4uXiGmGQyRSrVPYeH+fAXbpEzw5iEZJiQ7amyzimBkPIM6/eF4uEtadY/UKGvoBccy6+0ppyxOHDiAOQ9+u6oTxbR25fuXMmWSleJ2rKqz1DIQ43H846T+hk7tq/XlFqcpkS8NK7NsL8Ij+yIb/GqVMoEvk8imcJx2tu4qV3clEizuRSQimMkGhgAZ4qFOk71iMLqtADYWnLCbSVMQ7aex2JACkGmFJK5ay+5WZ7R0hCdN+E4MFCz/s9kwTJh/0x8yKoHJzhwZPLNppXK/nnoVxak6frZw35bKtPV/QletMLg6CFYv8InTmSVBiZKgr1Fwc5JyRP7ZSwbSgXBr02bc4MWuQlMc2bwa5HOHiSAakc6VA0nktW6fA+K+bp6gjCaEyNviAV8k+kGsoqTrD7jVIyhpSC5Lb/VlFIcYiXSRKVcR20FETyzN17iB8OQnHtSmk0vat9iJ4CBtGYgrTluleLYLPz8CZNSDOr5mZ3gnMCd3+LQzIo4245gdGBtlAYMTvliJJNVIbM4I5sE/lzuJBeyoGjGOmY949Ajhc0SxIC5AP+83zwVEcXI8GBZBu85O9vR4DfCCZUKH9q7h94Ypum9wuCxVs8Y+NAorr5UL0QKIQ4mtoiNWZtfYddPe2EwNxppQfJFqYHg6/vVZ6xBqqIPk0B/VXvVGcvZPhFPP376UUkGOkop0RhWMaI/DHnDZLxI2afjfFITY9Wlk9ZVVjk5AQ0idNvOaOJWZl6+1lCsVymrBtOKWkjaFNet9j0Mq+1VytVnmwVD4ZhCyCyAk8ridjANHCi0JoB0wmTrUd2NtjG8arunlor8MpthpzW/JW27YdRGjDVG4Fe1gFJW17VN0cHg7N0NTqLaRk3dWumG1emF5s0p5KvHPM8ikYYEkQKwLIdUZgDLSkzpveOxoFKMvXYOH+q+pG941RckgJdUWq9Anmsn3Gux0th77py6G339AGGouuMjMs+zSBCmkDOx2oZpYZi9Ux1TeOVJwmD+IIk4hJpahEgr5czIEukYcoDfRaeTbvqINFPzal3dMse0Fi9OUQuNFIiG0pEUkmSqr6UVLI6skkl0PygiSM70Kx3ji7W76HIVBiEq6k598wl7nr+4oeoKtBSzU1XWQoh5vXSqRVoP7mLsjhGmZjhAGKMPdpc+2yjSeF5IPl+mWHQJ/GjBrLpZ8szADwkarBC6hbylMFtxxlb+/4YUtOri/oJigZrmOSitmplX9scwM6e6RADl8syqIAwiwiBCCIHtmFi2gRQylvVORVUWH4YRah4tZbnk09NrdD2FbBhE7NtgK7NVer4wml8GSDkSr0UsZa7UGQuYECnuFxv4XfJEyiQIhYmjfbKqxEBikrcceSebnnyGAzEyjAx1IV7A8wKiBuxMa43nBnjuzDJDyiohSEOghOS+FWv50TGbeWZgDQU7iUbTVymyopTn2H3bOe/Bu0g1CErVWlMu+6TT3ROktYZy2aewLlswNehmW7cGfnlOqNVs9CQkEy0MboVKfF86H5Pb5ZH8XB7Lfns1jp2dQ/37gaeBu1+7GfOVLkf/6utQyTesbxpDC/Tn8/yAStmvvqwYzEQpxQMDh/CdYzZx+/pjCTKDmGb9IB7ogyeB3xy5iX/d8scM5Pdz3gO389Y/3F5XLvBDPEt2ZecTrTXFokupzyBIG5Nm4JeLQJ3yWCtdzYAVI0x6RUayrcUWQJWYma9+Iw7jRuM0ysIhmewjYbRePoRWgjD0W2a6WLUADlCp+HhugDtgsuOMfvqeqtD3dAWzCWFv7xngCxvP4tb1R2MZDk6yN85cy3jvENeeeR7f2HQ2l/36ZrY+89BMH0o+oa9Ipe2Op4MoUpRKLirSHDixF6BgepXiY8ApHdUIrOppPbeHoSJUGrPJ3KgQ3Cw38R/GCQgEyUQvZozBt6SgT4bIVoYeIFuqoO35/fVmI4oUbsUnCCK0hD2bewnSBvtPynDgxAzpXR79T1VI73YRU/T148NfzFWnn4svTQzDIpHoi9VWr2MQKU0xUBTTfXzy3Is487Hf8rFffPNgmSAIyU9GpFI2Vhx3tyloNL4X4VaqRrvyKpviGgegaALbWQABrOmL80I1u3OKdQP1xFL2FLvKJt/xj2GnGzFQuRMnCHDcMo7yMQUEySx+dhC3fxXu4DqiTNV7Z2XS5ISVaaIDu2iaBK8GfRWPfAUSCQvLMpHNPJN11TrnuUHd1rV7TumhMjjDgrWA4lqH4topB5GK4ttyE7dkqolUpTRIJvpi6dNOWZ2mz6kO6M6izyNjFRCC2449lYsG1/DFm/8Fe8paq7WmVPKwghDbNjHN5oE5Sml8L8TzgoPWWm0K9mw66IhSMIEF7Vy9um86smf+iXHXJKwbgL35iMd3BzyxN2RXLppSqtzFSiFwnAQJJ4FRK9T5ZZjcCzuq7DDUUO4ZZMXJp2EMbcafbB2c0hNFWFqjqbLzSsVHGgJDSoQUCAQq0kQ6ari+nzgqRe6I+Q0ZN6c3cYsxk0U34fTFiqAecMyDgw+wNmPzdM7Fm+rHc4Pr+Kvz3stXvvXZuvsCPyLwIwQ+himqeQikQOvqZpEq0nNN9AJ2bunF6zvY3vg0B+gYErAtiR/ML2Td96zLb55QTFbmzsUJJ0EylY61mYQpoKdwgOC2H7L91z+ERBKhdDUwtAkGG+wzrCJdF+TqGxY7s0Ps6eljRbnA4Qf2YKIoDdns3dzYF3Aa94j13GKcNNNH04ntIBrOGiSlNbPf0PaV67nylW/hb2/91pz7NZow1DDnrrnYd3KWwqF1ep0nF8wBAJK20ZIA9ufnDoJhmGQz2fovvg1IQdWpU1aTJpuGQSPvkpWzCODxwTX8+OhN3Lf2KPb0rSQ07bn+AFojdISlPBLapUcVeVnwCK8IHqgrlifBtebL0TW83rbiu7vl/Yh95YChlIXWmu15n6ABF/rlcVt49RP3c+qOJ2LXffBRDMGu03rJv2iOUu/xBXMAgJ6kZLK513RDOI5DOpOdd1vT+BCYVvUFhkGAZdUvlwrZAcLxCa572av5wQln4MbJ8i0EWpj40sQnTZ4V7HDW8z11Nsd4T/Kn3h2s1hN833gJbs1mXYZht53/6IH9ZZKWRCmNFIIj+xL4kWJ3KSCoMbb8wyvewre+elVbdbv9FrtP7cHtb9inJ7rCAfpTsq1KUuk0yUQXnQOmIITAsqyp/XJBTgWX/OKEl/O9cy9GxVhZtIKSNo8kj+eR5PFk/P3snbVphSE7W6tXAsWhWZtjB2bc0o7oT3L3niKFqTZyPYP86NjNvP7Re1rW52dM9p+UqX71zb+xx01gN1Wv4HjrlQZY2RPfyyeVWpzBr4VhGFM+HSGmaeL1DBGJlivxhnAMQY9jMlYJ55hux0iiqGd9C8kyuj5brygyBLwo6/DQ2Iy39Tde+kpevfv3mBWFMe1KJiB0JGHKoHSIQ+FQh0q/1WoFMr7lkmvGzC2XXKNHR4bvYAFp4VZl473aZDIVKyagGxACTNMkDAOCZAalI4w298gaSJpsHEojADdU3LmrWEcEYdjA775DZ76kKUk2CH0fTNbXtyezim3nHY6JQoQa6UeohImedWsrxbHSaj/MZAi5fZ6y80JruPvp1g4Zlml3NRbASdj09fVgz/a3mwXTtFjzy68jOzAGrc3YBz+ihCkZqEnEoFTUMFy8023xKqGi2ECQ3lue5cYkDH7rHI+dSGNlMhgDvVipNHaivcMwrJ3QBQL44f0VHt87vz1QCEE6073tVRIJh6GVK8hm06xatQK7hY48FZRZd+tNbbeT82aeS2tN3ptZainV+JkXklHk6ZxXZzp3Q8X2BjGWj+u5Mf/tQmt1PcyEhv2OanaGtkxOP3/Y5f7tre0FqVQ6Vlh4XCSTiTm//RYBpRm3wNpf3MjOs98Zu52dhQClBX2Owc6Cj1/ry6ebLHtV1LFP975ywFglz+qMjR9F7C83JrJxvTBOqrVSQ8dv/TpMcYAtl1zjUSWC2LjrKY87n2gdcmVISSLR3cRNlYo7z29RdXVsgGxpnIF7fxK7HaU1OwseDx0o13GD6rXGipeoCWeIi2iqzWaDDzApFvY+VRg+deimP1JQnyDiNuCMOBXszUf8/KF48XaJRRD6XNdj3/4xkokE5bKL7wc4tkVff8/UdCCIoohisUyhUKzz4Vu542FKG07EG1hYOoRm+osw9LDtxY17XKjmRKno+9P/134qv4hzswZ+dH+lqTdrLYSU1V1CFwGe65PL5fF9n2QywdCqFVMCYfX1GIZBb2+WwcEBal+ZEIJD7/wOYoEOIs30/JEKFjWXEEBWLGS/RI0RRge3AKp9ilup6gTmxT3PeuyMGQzi2M6i74YtpWSgv5dm30Ui4ZDJ1LNMS4esHP1+w/JxMZ/twfcWdwOsQ71tlIvjDY4JvEphXgKMonDipAs+vXP690EC2HLJNRHw9fkaLnqaWx+OT31WiyVaN2DbVtM5fxqzhUaAvgPPoorj6A48OrVW80buBJFH0EBH0A0EQYWXuo8QhUGDw8f3ypQLY9W0cw2gouiO2t+zxdWbmGePoF8+4uIG8V+YFTMn0EIQJ4OG2aCMFIKV9/4nz25+DVKYVR8+YSBENSHUNIvXaLSO0EqhdEQU+qhmK4AauG4BM213Nam20hEZfzdrmd8ErrXGd4sk0nOVu1qpL9b+ruvdlkuu+T1Qb+6aghdqHtwRfyeNqqPC4m+SEDQw9c5GFDYesBW5fRi+j1IBYejhB2U8v0DFzVGujFOujFOpTOC6eTy/SBBUYg1+FQrXnd9PsR1orXHdSU6Jno1VvtH2d1qrcNP5V/+o9lwj8myoMXloR0ALi28djAXFN8eH7weoFoEhlQYBnlDlAoc+dEfDa63Qr8u8Qf2BpG6ufwgjj3JlYl637zjQWlGpjEPk8Ur1WKx7Gm1nGwb+r2efazRKXwOuZpYj/33b2ttHZz4hqZtQkSKXKzAwMHfXLAA/CCjkm6eu6RvfzbaYbZlEbNbbOSN6kuP1biQa2wj5jtjY9J4o8imXDuAkslhm++v3KPKpuJNorXiVepwhHU/AtGebvLXSkQgvml1ONFJdjo4Mfx940/TvffmIL93aXpbMVCq9ZIYfgGQqQX9fz0GNo9ZQKpeZnMi3XLLKU05gIjPEAdLkRBqbkAFdYlAX6afMCkqs1EVO0jtI6foPwcfkcvOPGRetVd2mYeMkepAxQvGrU1LpYOaWNB5Xhd+jR88nXAoM08B2spizXXSDRwAACSFJREFUoqWDwLtj49uvnKPnacanP0ENATy4o/30MUsx/9eiUnaplF1Mw8AwJH4QxtbLH/H03bzm+CrLVAhkGysDm5D/Ff2STxmvw28xsGHkE5YOIA0T03CQ0kQKCUKiVYTSIUpFRGGA0jNzuETz3uhXDQffMCycZLbqgtbknWuttUA3zATfUETdcsk19wA/mP69O9e+YuP52h0jjCI8P2ir/e25mYFrZ/CnsUGPcYG6M3Z5FYX4fgnXnaRcmaBcHqPi5vC8aUGzXoB7e/RbjldzVTTSMEll+qsZWOf54KLQ/93Jb7+qoS/ZfGuUj0//sy9GEojZaCWYLSdUwoUbqraop/nL6DYsuqcFNFBcEI3yKvVow+uWnWwdnq01KlAXN7vclAC2XHLNvcAtZV9TdNv/Kl5IBBBFEV64cI51mnqay8MfM8DCN67q0S4fCH/KWerxpmXieB+Fkf/7Te/61INN62hx/8f35zuj6IUufZYSYRhQcLvT38P0Aa4Kvst50X0kWuakmQtbR7w++gOfCr/LMXrPvGXjpPYLw+ZfPzRZBdTiqvdf/PvbH/dOmrdQo4qFoL9/xZILg52gWMzzllNMDhvsru6iQII75eHcJ9fxhFiFamKvEGgO12NsVNvZop5qg4MI0j0DyCY6lzD0Hj75bVe+eL4aWj6xitT7TCl+EbaZtEhrTRD62NbiZgLtBoIwpFDpfiqWLC7nqIc5Rz1MUTjspJ+cSDBB1VzcR4U+yhyiJ+nVnewtqCkXxrGc6gaes+QBFQbBX7aqoSUHAPjgey78wYM7gje02z3HSZDJzB9V83wjDEMmJyc4+/gELz9q+RNrG/jIlkuuubJVoViWitV9+s8Gs0bbkk3QIsHUcoDnVb8811+O2+B1jPuAv4tTMBYBvP/qG/yjhoyLmqZEbwKlFJ6/OGbR7kDjTWUHTdjLX1aJiQC4YMsl18TyTYttq/zoZ6/75tGrzdF2e1Mpl5fD3skN4bouemq5mvqvQwBXbbnkmoYW3UZoy1g9lPXObXcqiKLoIJtdTlBKUa7ZUSPldM9u/zziAaDlvF+LWEJgLa5838Wn37vNv70S6NifjJSSvr6BZbUkLBbzeDVp4C88M8OhsxJYmKbmhBe3GfX6PEFFRHv32K86/E9HftXOfW0TAMDHLr3o8nue9q9q507bcsj29LQuuAQIfJ98zdYwQsBH37KelDObACKOP2rBwdNLgv0HrI+uPPu6/9vufR3xvU987rpPHbfW+lk79/iBR7n8/H9NURhSKNZ76hzS55BJTlnnZh0vBORy5s2dDD50SAAAud0PnfOiAWN+XeUsVCpl3AYbGS0VVBSRL0zOsRQevnrp/Ba6jWLJeLBv6/Vv7vT+jgng2lt+q9asEScP9ci2PEVKxQKuu/RCoVIR+fxkQyPV4auX85bzzeG6cixD+WULqWNBou/Hrr5h7/FrEycMZo22RrRUKlIqFuhOPvTWCHyf3GSOqIG/vCEFR7wACcDzZFlLYyNb/n1BX9OC1z4f/Psvbzt+jXHyQEa2Fa7iei75yUmiGKneF4JyuVRl+03M0yduyJK0Fy8l+2LA9aQ3WRAbk6dct+DsLl1Z/H74H697/NjV9ml9SdmW/TMIA3K5CcrlUtMB6hR+4DOZm6DSYPfMWmw5ZnmsTOLCdaW3d6992tDZNzR3FGgDXdN+fOSfr73/hHX21t5Ue0QAmkqlzERunEqlvEBHEo3vVwe+kJ8kbBIdM42VPZJBu0i5MEYUdr5t3lLB9WRpMm+euP4NI/d3q86O9ADz4cr3XXDE0/v13bsno45zDhmmiWM7WJaFYcwfYKKUIgh8/MCv7k3cBgG94eQkG9dPec8KSSY7QO32CaYZcewRT3f6GF2F58mxKLBOSp1+7a7WpeOj6wQA8E8fviDzzD7ue2pfeGQ36pNCIKScCtkSaKWItEJHqqPYPoBDeg0ufkWmzkXDSWTqtnNfLgRQKhkPpG1nC5u/tHBfs1lYFAKYxgffc+FPHtoZvHa5GYMEcOHWDGv764U/20nhJGf8F553AtCQmzS+0bf1hrctVhOLagH59BevP2fTi5x/cMw4GfaXDps22HMGH8AwFz+aOS6iSOj94/YHFnPwYZEJAOCT13zlA5vXm1tX9xrdi5RcAPrTBq86fm64uGk5mMvEfc11pbtvv3XOyld+5R8Wu60lsYF+5LPX33725lUrjl9r/ayTrXe7BccU/PmpKRxLIg0Ly05gOSmS6V6S6caxhUsJjWBszLxrzz5j1SGv/cpPl6LNRZUBGuETl777/Ef3eNfmynpJ+a0Q8LbT0hy5yiaZ7qtG07TAUsoAlYqsTOSsi9ecc+2/LUmDU1jy7/Fjn7v2ppesy6w9bo15W7MdRBYD55yY5IghEyeZiTX4SwWtYXzC/HFxMjmw1IMPzwMHqMUn//rCU/eM6288eyDcsFjdMCS84eQUJ62rDnqmd2XsrB2LzQHyBWO35xvvWPnKr9y6aI20wPNKANP4+P++6MJtB8LP7p1UXfUhdyzBW1+WYn1NwMdyIIBiyRzLF4wPrHnttdd3vfI2sSwIYBof+58XXbUjF713Ty5asEQ2mJW8+aVpVmbrBzuR6qkGVcZAtwmgXJFjpZL84Mqzr7+ua5UuEMuKAKbxiUsvfNu+gv7ktrHwiKhN04Ah4fSjEpx5tI3RQMYQQi6pEKi1oFAwtoVKfGRg63VfXVBli4BlSQDTuOqyvzhprBR8/rmx6OVFT7W02R7SZ/DGjckYW9kJpGFW9xWYJ++mZSlOPqHFpohN4PkynMxbd5QKxmWH/fGX7uuokiXAsiaAabz7TS+Thx52wntyJXXJrlx0YtHVdSO8YdDk1CNsjlplxdrNPC4sW3PKxvhJH8NQhBVXPhyE8l8Gtl5/bXc3ml8cvCAIoBZTxHBxrqT+0pTiyNOPdnoO6W22CeDC0IoANFAuGSXXlXdFWnxx6Ozrbn4hDHotXnAEMBujI8NZYCPVzS83T/09ioXnVJ5DAL4vfc8Xe8NAPBIpebsf6BvXvPa6uEnGliVe8ATQCKMjwz1UieIkYBDon3X01fwP1T2Tao8JIGeZurR+vTukFL+wnOAHA2feNL60T7L4+H8CKVOEajKgXgAAAABJRU5ErkJggg=='
                ,  width: 150,
            },
            [
              {
                text: 'Order Recipt',
                color: '#333333',
                width: '*',
                fontSize: 28,
                bold: true,
                alignment: 'right',
                margin: [0, 0, 0, 15],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'Order No.',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      {
                        text: `${data.orderId}`,
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Date Issued',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      {
                        text: this.getIssuedDate(data.createdDate),// `${data.paymentDate}`,
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Status',
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 12,
                        alignment: 'right',
                        width: '*',
                      },
                      this.getPaidStatus(data.invoicePrinted)
                    
                    ],
                  },
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: 'Recipt owner details',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            }
          ],
        },
        {
          columns: [
            {
              text: `${data.userId}\n${data.clientName}\n ${data.email}`,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
            
          ],
        },
        {
          columns: [
            {
              text: 'Note',
              color: 'red',
              bold: true,
              margin: [0, 7, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: `Hi ${data.clientName} show this recipt to casier and get your items`,
              style: 'invoiceBillingAddress',
            }
           
          ],
        },
        '\n\n',
        
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function(i, node) {
              return 1;
            },
            vLineWidth: function(i, node) {
              return 1;
            },
            hLineColor: function(i, node) {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: function(i, node) {
              return '#eaeaea';
            },
            hLineStyle: function(i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function(i, node) {
              return 10;
            },
            paddingRight: function(i, node) {
              return 10;
            },
            paddingTop: function(i, node) {
              return 2;
            },
            paddingBottom: function(i, node) {
              return 2;
            },
            fillColor: function(rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*','*','*', 80],
            body: [
              [
                {
                  text: 'ITEM ID',
                  fillColor: '#eaf2f5',
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'ITEM NAME',
                  fillColor: '#eaf2f5',
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'ITEM QUANTITY',
                  fillColor: '#eaf2f5',
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'ITEM TOTAL',
                  border: [false, true, false, true],
                  alignment: 'left',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
              ],
              
              ...cartValue.map((cart)=>{
                return [
                  cart.itemId,
                  cart.itemName,
                  cart.qty,
                  this.formatMoney(cart.totalPrice),
    
                ]
    
              })
    
    
            ],
          },
        },
        '\n',
        '\n\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function(i, node) {
              return 1;
            },
            vLineWidth: function(i, node) {
              return 1;
            },
            hLineColor: function(i, node) {
              return '#eaeaea';
            },
            vLineColor: function(i, node) {
              return '#eaeaea';
            },
            hLineStyle: function(i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function(i, node) {
              return 10;
            },
            paddingRight: function(i, node) {
              return 10;
            },
            paddingTop: function(i, node) {
              return 3;
            },
            paddingBottom: function(i, node) {
              return 3;
            },
            fillColor: function(rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              
            
              [
                {
                  text: 'Total Amount',
                  bold: true,
                  fontSize: 20,
                  alignment: 'right',
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                },
                {
                  text: ` ${this.formatMoney(data.paymentTotal)}`,
                  bold: true,
                  fontSize: 20,
                  alignment: 'right',
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
        '\n\n',
       
      ],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      },
    };
      }


     static getPaidStatus(invoiceStatus) {
        var text = '';
        var color = '';
      if(invoiceStatus){
        var text = 'PAID';
        var color = 'green';
      }else{
        var text = 'PENDING';
        var color = 'red';
      }
      let returnData =  {
        text: text,
        bold: true,
        fontSize: 14,
        alignment: 'right',
        color: color,
        width: 100,
      }

      return returnData;
    
      }
      static getInvoiceDocumentation(orderData ,data){
        // try here http://pdfmake.org/playground.html
        
        var cartValue = orderData.CartValues;
      
        //return;
        return {
          content: [
            {
              columns: [
                {
                  image:
                    'data:image/png;base64,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',
                  width: 150,
                },
                [
                  {
                    text: 'Invoice',
                    color: '#333333',
                    width: '*',
                    fontSize: 28,
                    bold: true,
                    alignment: 'right',
                    margin: [0, 0, 0, 15],
                  },
                  {
                    stack: [
                      {
                        columns: [
                          {
                            text: 'Invoice No.',
                            color: '#aaaaab',
                            bold: true,
                            width: '*',
                            fontSize: 12,
                            alignment: 'right',
                          },
                          {
                            text: `${data.invoiceId}`,
                            bold: true,
                            color: '#333333',
                            fontSize: 12,
                            alignment: 'right',
                            width: 100,
                          },
                        ],
                      },
                      {
                        columns: [
                          {
                            text: 'Date Issued',
                            color: '#aaaaab',
                            bold: true,
                            width: '*',
                            fontSize: 12,
                            alignment: 'right',
                          },
                          {
                            text: `${moment(data.createdDate).format('YYYY-MM-DD')}`,
                            bold: true,
                            color: '#333333',
                            fontSize: 12,
                            alignment: 'right',
                            width: 100,
                          },
                        ],
                      },
                      {
                        columns: [
                          {
                            text: 'Status',
                            color: '#aaaaab',
                            bold: true,
                            fontSize: 12,
                            alignment: 'right',
                            width: '*',
                          },
                          {
                            text: 'PAID',
                            bold: true,
                            fontSize: 14,
                            alignment: 'right',
                            color: 'green',
                            width: 100,
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
            {
              columns: [
                {
                  text: 'From',
                  color: '#aaaaab',
                  bold: true,
                  fontSize: 14,
                  alignment: 'left',
                  margin: [0, 20, 0, 5],
                },
                {
                  text: 'To',
                  color: '#aaaaab',
                  bold: true,
                  fontSize: 14,
                  alignment: 'left',
                  margin: [0, 20, 0, 5],
                },
              ],
            },
            {
              columns: [
                {
                  text: 'Your Name \n Gym Managment Inc.',
                  bold: true,
                  color: '#333333',
                  alignment: 'left',
                },
                {
                  text: 'Client Name \n Client Company',
                  bold: true,
                  color: '#333333',
                  alignment: 'left',
                },
              ],
            },
            {
              columns: [
                {
                  text: 'Address',
                  color: '#aaaaab',
                  bold: true,
                  margin: [0, 7, 0, 3],
                },
                {
                  text: 'Address',
                  color: '#aaaaab',
                  bold: true,
                  margin: [0, 7, 0, 3],
                },
              ],
            },
            {
              columns: [
                {
                  text: '9999 Street name 1A \n New-York City NY 00000 \n   USA',
                  style: 'invoiceBillingAddress',
                },
                {
                  text: '1111 Other street 25 \n New-York City NY 00000 \n   USA',
                  style: 'invoiceBillingAddress',
                },
              ],
            },
            '\n\n',
            
            {
              layout: {
                defaultBorder: false,
                hLineWidth: function(i, node) {
                  return 1;
                },
                vLineWidth: function(i, node) {
                  return 1;
                },
                hLineColor: function(i, node) {
                  if (i === 1 || i === 0) {
                    return '#bfdde8';
                  }
                  return '#eaeaea';
                },
                vLineColor: function(i, node) {
                  return '#eaeaea';
                },
                hLineStyle: function(i, node) {
                  // if (i === 0 || i === node.table.body.length) {
                  return null;
                  //}
                },
                // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                paddingLeft: function(i, node) {
                  return 10;
                },
                paddingRight: function(i, node) {
                  return 10;
                },
                paddingTop: function(i, node) {
                  return 2;
                },
                paddingBottom: function(i, node) {
                  return 2;
                },
                fillColor: function(rowIndex, node, columnIndex) {
                  return '#fff';
                },
              },
              table: {
                headerRows: 1,
                widths: ['*','*','*', 80],
                body: [
                  [
                    {
                      text: 'ITEM ID',
                      fillColor: '#eaf2f5',
                      border: [false, true, false, true],
                      margin: [0, 5, 0, 5],
                      textTransform: 'uppercase',
                    },
                    {
                      text: 'ITEM NAME',
                      fillColor: '#eaf2f5',
                      border: [false, true, false, true],
                      margin: [0, 5, 0, 5],
                      textTransform: 'uppercase',
                    },
                    {
                      text: 'ITEM QUANTITY',
                      fillColor: '#eaf2f5',
                      border: [false, true, false, true],
                      margin: [0, 5, 0, 5],
                      textTransform: 'uppercase',
                    },
                    {
                      text: 'ITEM TOTAL',
                      border: [false, true, false, true],
                      alignment: 'left',
                      fillColor: '#eaf2f5',
                      margin: [0, 5, 0, 5],
                      textTransform: 'uppercase',
                    },
                  ],
                  
                  ...cartValue.map((cart)=>{
                    return [
                      cart.itemId,
                      cart.itemName,
                      cart.qty,
                      cart.totalPrice,
        
                    ]
        
                  })
        
        
                ],
              },
            },
            '\n',
            '\n\n',
            {
              layout: {
                defaultBorder: false,
                hLineWidth: function(i, node) {
                  return 1;
                },
                vLineWidth: function(i, node) {
                  return 1;
                },
                hLineColor: function(i, node) {
                  return '#eaeaea';
                },
                vLineColor: function(i, node) {
                  return '#eaeaea';
                },
                hLineStyle: function(i, node) {
                  // if (i === 0 || i === node.table.body.length) {
                  return null;
                  //}
                },
                // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                paddingLeft: function(i, node) {
                  return 10;
                },
                paddingRight: function(i, node) {
                  return 10;
                },
                paddingTop: function(i, node) {
                  return 3;
                },
                paddingBottom: function(i, node) {
                  return 3;
                },
                fillColor: function(rowIndex, node, columnIndex) {
                  return '#fff';
                },
              },
              table: {
                headerRows: 1,
                widths: ['*', 'auto'],
                body: [
                  
                
                  [
                    {
                      text: 'Total Amount',
                      bold: true,
                      fontSize: 20,
                      alignment: 'right',
                      border: [false, false, false, true],
                      margin: [0, 5, 0, 5],
                    },
                    {
                      text: `Rs : ${data.paymentTotal}`,
                      bold: true,
                      fontSize: 20,
                      alignment: 'right',
                      border: [false, false, false, true],
                      fillColor: '#f5f5f5',
                      margin: [0, 5, 0, 5],
                    },
                  ],
                ],
              },
            },
            '\n\n',
            {
              text: 'NOTES',
              style: 'notesTitle',
            },
            {
              text: 'Hi Customer show this recipt to casier and buy your order',
              style: 'notesText',
            },
          ],
          styles: {
            notesTitle: {
              fontSize: 10,
              bold: true,
              margin: [0, 50, 0, 3],
            },
            notesText: {
              fontSize: 10,
            },
          },
          defaultStyle: {
            columnGap: 20,
            //font: 'Quicksand',
          },
        };
          }
    static getIssuedDate(date){
         let varformatDate = moment(date).format('YYYY-MM-DD');
         return varformatDate;
    }

    static formatMoney(number) {
      return number.toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
    }

    static getSalesAmountTotal(response , typeGRN = ''){
      let salesTotal = 0;
       if(response && typeGRN==''){
         response.forEach((res , index)=>{
           salesTotal = salesTotal + (res.sellingPrice * res.deductQty);
         })
       }else if (typeGRN == 'grnWithoutItem'){
        if(response){
          response.forEach((res , index)=>{
            salesTotal = salesTotal + Number(res.totalAmount);
          })
       }
       return this.formatMoney(salesTotal);
    }
  }
  static  getScheduleTimeTable(data){
    // try here http://pdfmake.org/playground.html
    
    var cartValue = data[0].normal;
    
  
    //return;
    return {
  content: [
    {
      columns: [
        {
          image:
            'data:image/png;base64,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',
            width: 150,
        },
        [
          {
            text: 'Schedule Time Table',
            color: '#333333',
            width: '*',
            fontSize: 28,
            bold: true,
            alignment: 'right',
            margin: [0, 0, 0, 15],
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: 'Schedule No.',
                    color: '#aaaaab',
                    bold: true,
                    width: '*',
                    fontSize: 12,
                    alignment: 'right',
                  },
                  {
                    text: `${data[0].ScheduleId}`,
                    bold: true,
                    color: '#333333',
                    fontSize: 12,
                    alignment: 'right',
                    width: 100,
                  },
                ],
              },
              {
                columns: [
                  {
                    text: 'Schedule Name',
                    color: '#aaaaab',
                    bold: true,
                    width: '*',
                    fontSize: 12,
                    alignment: 'right',
                  },
                  {
                    text: `${data[0].nameOfSchedule}`,
                    bold: true,
                    color: '#333333',
                    fontSize: 12,
                    alignment: 'right',
                    width: 100,
                  },
                ],
              },
              {
                columns: [
                  {
                    text: 'Date Issued',
                    color: '#aaaaab',
                    bold: true,
                    width: '*',
                    fontSize: 12,
                    alignment: 'right',
                  },
                  {
                    text: moment(data[0].createdDate).format('MMM Do YY'),
                    bold: true,
                    color: '#333333',
                    fontSize: 12,
                    alignment: 'right',
                    width: 100,
                  },
                ],
              },
              {
                columns: [
                  {
                    text: 'Membership Id',
                    color: '#aaaaab',
                    bold: true,
                    fontSize: 12,
                    alignment: 'right',
                    width: '*',
                  },
                  {
                    text: data[0].membershipId,
                    bold: true,
                    fontSize: 14,
                    alignment: 'right',
                    color: 'black',
                    width: 100,
                  },
                ],
              },
            ],
          },
        ],
      ],
    },
    {
      columns: [
        {
          text: 'Instructor Name',
          color: '#aaaaab',
          bold: true,
          fontSize: 14,
          alignment: 'left',
          margin: [0, 20, 0, 5],
        }
      ],
    },
    {
      columns: [
        {
          text: data[0].instructorName,
          bold: true,
          color: '#333333',
          alignment: 'left',
        },
    
      ],
    },
    {
      columns: [
        {
          text: 'Contact Number',
          color: '#aaaaab',
          bold: true,
          margin: [0, 7, 0, 3],
        },
        
      ],
    },
    {
      columns: [
        {
          text:data[0].contact,
          style: 'invoiceBillingAddress',
        },
       
      ],
    },
    '\n\n',
    {
      width: '100%',
      alignment: 'center',
      text: 'Scheule Exercise',
      bold: true,
      margin: [0, 10, 0, 10],
      fontSize: 15,
    },
    {
      layout: {
        defaultBorder: false,
        hLineWidth: function(i, node) {
          return 1;
        },
        vLineWidth: function(i, node) {
          return 1;
        },
        hLineColor: function(i, node) {
          if (i === 1 || i === 0) {
            return '#bfdde8';
          }
          return '#eaeaea';
        },
        vLineColor: function(i, node) {
          return '#eaeaea';
        },
        hLineStyle: function(i, node) {
          // if (i === 0 || i === node.table.body.length) {
          return null;
          //}
        },
        // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
        paddingLeft: function(i, node) {
          return 10;
        },
        paddingRight: function(i, node) {
          return 10;
        },
        paddingTop: function(i, node) {
          return 2;
        },
        paddingBottom: function(i, node) {
          return 2;
        },
        fillColor: function(rowIndex, node, columnIndex) {
          return '#fff';
        },
      },
      table: {
        headerRows: 1,
        widths: ['*', "auto","auto"],
        body: [
          [
            {
              text: 'EXERCISE NAME',
              fillColor: '#eaf2f5',
              border: [false, true, false, true],
              margin: [0, 5, 0, 5],
              textTransform: 'uppercase',
            },
            
            {
              text: 'SETS',
              border: [false, true, false, true],
              alignment: 'right',
              fillColor: '#eaf2f5',
              margin: [0, 5, 0, 5],
              textTransform: 'uppercase',
            },
                {
              text: 'ROUNDS',
              border: [false, true, false, true],
              alignment: 'right',
              fillColor: '#eaf2f5',
              margin: [0, 5, 0, 5],
              textTransform: 'uppercase',
            },
          ],
      
          ...cartValue.map((cart)=>{
            return [
              cart.normalExerciseName,
              cart.normalExerciseRepetition,
              cart.normalExerciseRounds,
            ]

          })
        ],
      },
    },
    '\n',
    '\n\n',
    {
      layout: {
        defaultBorder: false,
        hLineWidth: function(i, node) {
          return 1;
        },
        vLineWidth: function(i, node) {
          return 1;
        },
        hLineColor: function(i, node) {
          return '#eaeaea';
        },
        vLineColor: function(i, node) {
          return '#eaeaea';
        },
        hLineStyle: function(i, node) {
          // if (i === 0 || i === node.table.body.length) {
          return null;
          //}
        },
        // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
        paddingLeft: function(i, node) {
          return 10;
        },
        paddingRight: function(i, node) {
          return 10;
        },
        paddingTop: function(i, node) {
          return 3;
        },
        paddingBottom: function(i, node) {
          return 3;
        },
        fillColor: function(rowIndex, node, columnIndex) {
          return '#fff';
        },
      },
      table: {
        headerRows: 1,
        widths: ['*', 'auto'],
        body: [
          [
            {
              text: 'Payment Subtotal',
              border: [false, true, false, true],
              alignment: 'right',
              margin: [0, 5, 0, 5],
            },
            {
              border: [false, true, false, true],
              text: '$999.99',
              alignment: 'right',
              fillColor: '#f5f5f5',
              margin: [0, 5, 0, 5],
            },
          ],
          [
            {
              text: 'Payment Processing Fee',
              border: [false, false, false, true],
              alignment: 'right',
              margin: [0, 5, 0, 5],
            },
            {
              text: '$999.99',
              border: [false, false, false, true],
              fillColor: '#f5f5f5',
              alignment: 'right',
              margin: [0, 5, 0, 5],
            },
          ],
          [
            {
              text: 'Total Amount',
              bold: true,
              fontSize: 20,
              alignment: 'right',
              border: [false, false, false, true],
              margin: [0, 5, 0, 5],
            },
            {
              text: 'USD $999.99',
              bold: true,
              fontSize: 20,
              alignment: 'right',
              border: [false, false, false, true],
              fillColor: '#f5f5f5',
              margin: [0, 5, 0, 5],
            },
          ],
        ],
      },
    },
    '\n\n',
    {
      text: 'NOTES',
      style: 'notesTitle',
    },
    {
      text: 'Some notes goes here \n Notes second line',
      style: 'notesText',
    },
  ],
  styles: {
    notesTitle: {
      fontSize: 10,
      bold: true,
      margin: [0, 50, 0, 3],
    },
    notesText: {
      fontSize: 10,
    },
  },
  defaultStyle: {
    columnGap: 20,
    //font: 'Quicksand',
  },
};
      }
}


//////////////////////dsadd

