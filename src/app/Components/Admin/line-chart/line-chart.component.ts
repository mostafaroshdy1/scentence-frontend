import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiAdminService } from '../../../Services/api-admin.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  Data: any;
  chartData: any;
  chart!: Chart;
  userCount: any;
  constructor(private apiService: ApiAdminService) {}

  ngOnInit(): void {
    console.log('start fetch ');
    this.fetchData();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  fetchData(): void {
    console.log('Fetching data');
    this.apiService.countNumberOfProducts().subscribe((productData: any) => {
      console.log('product chart data', productData);
      this.apiService.countUsers().subscribe((userData: any) => {
        console.log('user chart data', userData);
        const userCount =
          userData.count && userData.count.length > 0
            ? userData.count[0].users
            : 0;
        console.log('count User ' + userCount);
        this.userCount = userCount;
        this.apiService.countOrders().subscribe((orderData: any) => {
          console.log('orderd chart data', productData);
          this.chartData = {
            labels: Object.keys(productData),
            datasets: [
              {
                label: 'Products',
                data: Object.values(productData),
                backgroundColor: '#9fa8da',
                borderColor: '#9fa8da',
                borderWidth: 1,
                barPercentage: 0.6,
              },
              {
                label: 'Users',
                data: [this.userCount],
                backgroundColor: '#f48fb1',
                borderColor: '#f48fb1',
                borderWidth: 1,
                barPercentage: 0.6,
              },
              {
                label: 'Orders',
                data: Object.values(orderData),
                backgroundColor: '#80cbc4',
                borderColor: '#80cbc4',
                borderWidth: 1,
                barPercentage: 0.6,
              },
            ],
          };
          this.renderChart();
        });
      });
    });
  }

  renderChart(): void {
    const ctx = document.getElementById('lineChart');
    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }

    // if (this.chart) {
    //   this.chart.destroy();
    // }

    this.chart = new Chart(ctx as any, {
      type: 'bar',
      data: this.chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  handleResize(): void {
    this.renderChart();
  }
}
