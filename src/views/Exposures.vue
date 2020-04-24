<template>
  <v-card>

   <!-- Start filters -->
       <template>
           <v-layout >
              <v-flex
               xs12
                  md6
                  sm6
                  lg2
                  >

            <template>

                 <v-combobox
         v-model="counties"
         :items="all_counties"
          item-text="name"
          item-value="id"
          label="Select County"
          v-on:change="getSubCounties"
          multiple
          clerable
          persistent-hint
          chips>
          </v-combobox>
                
            </template>
            </v-flex>

               <v-flex
               xs12
                  md6
                  sm6
                  lg2
                  >

            <template>

                 <v-combobox
         v-model="subcounties"
          :items="all_subcounties"
          item-text="name"
          item-value="id"
          label="Select Sub-County"
          :disabled="active"
          v-on:change="getFacilitysubcountyfilter"
          multiple
          clerable
          persistent-hint
          chips>
          </v-combobox>
                
            </template>
            </v-flex>

              <v-flex
               xs12
                  md6
                  sm6
                  lg2
                  >

            <template>

                 <v-combobox
          v-model="facility"
          item-text="partner"
          item-value="id"
          :items="all_facilities"
          label="Select Partner"
          multiple
          disabled
          clerable
          persistent-hint
          chips>
          </v-combobox>
                
            </template>
            </v-flex>

              <v-flex
               xs12
               sm6
                  md6
                  lg2
                  >

            <template>

                 <v-combobox
          :items="all_facilities_level"
          label="Select Facility Level"
          v-on:change="getFacilitylevelfilter"
           :disabled="active_level"
          multiple
          clerable
          persistent-hint
          chips>
          </v-combobox>
                
            </template>
            </v-flex>

           <v-flex
           xs12
           sm6
             md6
            lg2
           >
            <template>
                 <v-combobox
          v-model="facility"
          :items="fac"
          item-text="name"
          item-value="id"
          label="Select Facility"
          v-on:change="getFacilityfilter"
          :disabled="active_fac"
          multiple
          clerable
          persistent-hint
          chips>
          </v-combobox>
                
            </template>
           </v-flex>
           
             <template>
          <v-flex xs12 sm6 md2 lg2> 
            <v-menu
              ref="menu1"
              :close-on-content-click="false"
              v-model="menu1"
              :nudge-right="40"
              :return-value.sync="startDate"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="startDate"
                label="Start Date"
                prepend-icon="mdi-calendar"
                readonly
              ></v-text-field>
              <v-date-picker :dark="true" v-model="startDate" no-title scrollable :max="endDate" :min="minDate">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="click();$refs.menu1.save(startDate);click">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6 md2 lg2>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="endDate"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="endDate"
                label="End Date"
                prepend-icon="mdi-calendar"
                readonly
              ></v-text-field>
              <v-date-picker :dark="true" v-model="endDate" no-title scrollable :max="maxDate" :min="startDate">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="click();$refs.menu.save(endDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </template>
        </v-layout>

                <template>
                  <v-btn block color="secondary" dark>Filter</v-btn>
                </template>
       </template>
               
            <!-- End filters -->

    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Summary Report</v-tab>
      <v-tab>Report By Type</v-tab>
      <v-tab>Report By Location</v-tab>
      <v-tab>Report By Device</v-tab>
      <v-tab>Report By Cadre</v-tab>
      <v-tab>Report By Month</v-tab>
      <v-tab>Report By Age</v-tab>
      <v-tab>Report By Hours</v-tab>
      <v-tab>Report By Gender</v-tab>
      <v-tab-item
        v-for="n in 9"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
            <!-- Start Graphs -->
         
            <highcharts
                  ref="barChart"
                  :options="barOptionsTime"/>

          </v-card-text>

          <!-- Start Exposure Type -->

          <v-card-text v-if="n==2">

            <highcharts
                  ref="barChart"
                  :options="barOptions"/>

          </v-card-text>

          <!-- Start Exposure Location -->

          <v-card-text v-if="n==3">
            <highcharts
              ref="barChart"
              :options="barOptionsLocation"/>
          </v-card-text>

          <!-- Start Exposure Devices -->

          <v-card-text v-if="n==4">
            <highcharts
              ref="barChart"
              :options="barOptionsDevice"/>
          </v-card-text>

          <!-- Start Exposure Cadre -->

          <v-card-text v-if="n==5">
                <highcharts
                  ref="barChart"
                  :options="barOptionsCadre"/>

          </v-card-text>

          <!-- Start Exposure Time -->

          <v-card-text v-if="n==6">

            <highcharts
              ref="barChart"
              :options="barOptionsTime"/>
          </v-card-text>

          <!--Start Exposure Age -->

          <v-card-text v-if="n==7">
            <template>
              <div
                v-if="value" >
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                />
              </div>
              <highcharts
                ref="barChart"
                :options="barOptionsAge"/>
            </template>

          </v-card-text>

          <!-- Start Exposure Hour -->

          <v-card-text v-if="n==8">
            <highcharts
              ref="barChart"
              :options="barOptionsHour"/>
          </v-card-text>

          <!-- Start Gender -->
          <v-card-text v-if="n==9">

            <template>
              <div
                v-if="value1" >
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                />
              </div>
              <highcharts
                ref="barChart"
                :options="gendOptions"/>
            </template>


          </v-card-text>
          <v-card-text v-if="n==10">This is the Third tab</v-card-text>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>

</template>

<script>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'
import moment from 'moment'
import Exposure_by_time from './Exposure_by_time'
//import json from '../map.json'

// SeriesLabel(Highcharts);
exportingInit(Highcharts)

export default {

  computed: {

    cadreCount () {
      return this.c
    },

    ...mapGetters({
      user: 'auth/user'
    })

  },
  components: {
    Exposure_by_time,
    highcharts: Chart
  },
  data () {
    return {

      
     facility: '',
       counties: '',
       subcounties: '',
       all_facilities_level: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5 and Above'],
       all_facilities: [],
       all_subcounties: [],
       all_counties: [],
       fac: [],
       active: true,
       active_fac: true,
       active_level: true,
       menu: false,
      menu1: false,
      startDate: '2016-01-01',
      maxDate: new Date().toISOString().substr(0, 10),
      minDate: '2016-01-01',
      endDate: new Date().toISOString().substr(0, 10),
       //end

      value: true,
      value1: true,
      valuec: true,

      barOptionsSummary: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Total Health Care Worker Exposure Trends'
        },
        subtitle: {
          // text: 'by Cadre'
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Exposed Health Care Workers',
            align: 'high'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

          },
          labels: {
            items: [
              {
                html: '',
                style: {
                  left: '50px',
                  top: '18px',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
              }
            ]
          },
          series: [

            {
              // type: 'column',
              colorByPoint: true,
              name: 'Exposures',
              data: []
            }

          ]
        }
      },

      gendOptions: {
        xAxis: {
          categories: ['MALE', 'FEMALE', 'UNDEFINED'],
          title: {
            text: 'Gender'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
            align: 'high'
          },
          labels: {
            overflow: 'justify',
            items: [
              {
                html: '',
                style: {
                  left: '50px',
                  top: '18px',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
              }
            ]
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Exposure by Gender'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },
      // devices starts

      barOptionsDevice: {
        xAxis: {
          categories: ['syringe/needle IM/SC injection', 'Syringe /needle blood drawing', 'Phlebotomy needle/vacuum set', 'IV catheter/canula', 'Needle on IV-line', 'Unused needle', 'Lancet', 'Sature needle', 'Scalpel', 'Capillary tube', 'Glass slide', 'Pippete tip', 'Other'],
          title: {
            text: 'Devices'
          }
        },
        
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
            align: 'high'
          },
          labels: {
            overflow: 'justify',
            items: [
              {
                html: '',
                style: {
                  left: '50px',
                  top: '18px',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
              }
            ]
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Exposures by Devices'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      // devices ends

      barOptionsAge: {
        xAxis: {
          categories: ['18 - 25', '26 - 35', '36 - 45', '46 - 55', '56 - 65', '65 and Above', 'undefined'],
          title: {
            text: 'Age Groups'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
            align: 'high'
          },
          labels: {
            overflow: 'justify',
            items: [
              {
                html: '',
                style: {
                  left: '50px',
                  top: '18px',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
              }
            ]
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Exposures by Age'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      // stats
      barOptionsHour: {
        xAxis: {
          categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00' ],
          title: {
            text: 'Hours Range'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
            align: 'high'
          },
          labels: {
            overflow: 'justify',
            items: [
              {
                html: '',
                style: {
                  left: '50px',
                  top: '18px',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
              }
            ]
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Exposures by Hours'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      // ends

      barOptionsTime: {
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          title: {
            text: 'Months Range'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
            align: 'high'
          },
          labels: {
            overflow: 'justify',
            items: [
              {
                html: '',
                style: {
                  left: '50px',
                  top: '18px',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
              }
            ]
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Exposures by Months'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      barOptionsCadre: {
        xAxis: {
          categories: ['Nurse', 'Clinical officer', 'Doctor', 'Laboratory Technologist', 'Student', 'Cleaner', 'Waste Handler', 'VCT Counsellor', 'Other-Specify'],
          title: {
            text: 'Cadre'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
            align: 'high'
          },
          labels: {
            overflow: 'justify',
            items: [
              {
                html: '',
                style: {
                  left: '50px',
                  top: '18px',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
              }
            ]
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Exposures by Cadre'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      barOptions: {
        xAxis: {
          categories: ['Cuts', 'Bite', 'Needle Stick', 'Splash on Mucosa', 'Non-Intact Skin', 'Other'],
          title: {
            text: 'Exposure Type'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
            align: 'high'
          },
          labels: {
            overflow: 'justify',
            items: [
              {
                html: '',
                style: {
                  left: '50px',
                  top: '18px',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
              }
            ]
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Exposures by Type'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      barOptionsLocation: {
        xAxis: {
          categories: ['Medical ward', 'Surgical ward', 'Theater', 'Maternity', 'Dental clinic', 'OP/MCH', 'Laundry', 'Laboratory', 'Other'],
          title: {
            text: 'Exposure Location'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
            align: 'high'
          },
          labels: {
            overflow: 'justify',
            items: [
              {
                html: '',
                style: {
                  left: '50px',
                  top: '18px',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
              }
            ]
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Exposures by Location'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      pieOptions: {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Exposures By Location in Facility'
        },
        subtitle: {
          text: 'by location'
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [
          {
            name: 'Exposures Count',
            data: []
          }
        ]
      },
      s: [],
      locations: [],
      hcw: [],
      type: [],
      cadre: [],
      dob: [],
      date: [],
      users: [],
      gender: [],
      hours: [],
       load: true,
      fac_filt: [],
      fac_filtl: [],
      fac_filtf: [],
      exp_filt: [],
      exp_filtl: [],
      exp_filtf: [],

      seriesname: ['Theater', 'Theater', 'Theater'],
      seriesdata: []

    }
  },

  created () {
    this.getExp()
    this.getCad()
    this.getFacilities()
    this.getCountt()
    this.getCounties()
    // this.getExpo()
  },
  methods: {

    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
        })
        .catch(error => console.log(error.message))
    },

    getCounties () {
      axios.get('counties')
        .then((counties) => {
          console.log(counties.data.data)
          this.all_counties = counties.data.data
        })
        .catch(error => console.log(error.message))
    },

    getSubCounties (sb) {

      if(sb.length > 0){
        this.active = false
        this.all_subcounties = []
        for(var x in sb){
          axios.get(`subcounties/${sb[i].id}`)
          .then((subcounties) => {
            this.all_subcounties = this.all_subcounties.concat(subcounties.data.data)
          } )
          .catch(error => console.log(error.message))
        }
        this.getFacilitycountyfilter(sb)
      }else{
         this.active = true
        this.getFacilitycountyfilter(sb)
      }
    },

    getFacilitycountyfilter (cf){
      this.fac_filt = [], this.exp_filt = []
      if(cf.length > 0){
        for(var c in cf){
          for(var a in this.all_facilities){
            if(this.all_facilities[a].county == cf[c].name){
              this.fac_filt.push(this.all_facilities[a])
            }
          }
           for(var e in this.s){
              if(this.s[e].county == cf[e].name){
                this.exp_filt.push(this.s[e])
              }
            }
        } 
        this.getAgeData(this.exp_filt)
        this.fac = this.fac_filt.sort()
      }else{
      
        this.getAgeData(this.s)
        this.fac = this.all_facilities
      }
    },
    getFacilitysubcountyfilter (fsb){
       this.exp_filtl = [], this.fac_filtl = []
       this.active_level = false
       if(fsb.length > 0){
         for(var sb in fsb){
           for(var a in this.fac_filt){
             if(this.fac_filt[a].sub_county == fsb[sb].name){
               this.fac_filtl.push(this.fac_filt[a])
             }
           }
            for(var e in this.exp_filt){
               if(this.exp_filt[e].sub_county == this.fsb[sb].name){
                 this.exp_filtl.push(this.exp_filt[e])
               }
             }
         }
       
         this.getAgeData(this.exp_filtl)
         this.fac = this.fac_filtl.sort()
       }else{
         
         this.getAgeData(this.exp_filt)
         this.fac = this.fac_filt
         this.active_level = true
       }
    },

    getFacilitylevelfilter (fl){
      this.fac_filtf = [], this.exp_filtf = []
      this.active_fac = false
      if(fl.length > 0){
        for(var l in fl){
          for(var a in this.fac_filtl){
            if(this.fac_filtl[a].level == fl[l]){
              this.fac_filtf.push(this.fac_filtl[a])
            }else if(fl[l] == 'Level 5 and Above'){
               if(Number(this.fac_filtl[a].level.slice(6,7)) >= 5){
                 this.fac_filtf.push(this.fac_filtl[a])
               }
             }
          }
          for(var e in this.exp_filtl){
            if(this.exp_filtl[e].facility_level == fl[l]){
              this.exp_filtf.push(this.exp_filtl[e])
            }else if(this.fl[l] == 'Level 5 and Above'){
              if(Number(this.exp_filtl[e].facility_leve.slice(6,7)) >= 5){
                this.exp_filtf.push(this.exp_filtl[e])
              }
            }
          }
        }
       
        this.getAgeData(this.exp_filtf)
        this.fac = this.fac_filtf.sort()
      }else{
       
        this.getAgeData(this.exp_filtl)
        this.fac = this.fac_filtl
        this.active_fac = true
      }
    },

    getFacilityfilter (f){
      let al = [], exp = []
      if(f.length > 0){
        for(var s in f){
          for(var e in this.exp_filtf){
            if(this.exp_filtf[e].facility_name == f[s].name){
              exp.push(this.exp_filtf[e])
            }
          }
        }
        this.getAgeData(rg)
      
      }else{
       
        this.getAgeData(this.exp_filtf)
      }

    },
    click () {
      let expo = []
      var dates = {
        convert:function(d) {
          return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
          );
        },
        inRange:function(d,start,end) {
          return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
          );
        }
      }
       for (var e in this.s) {
        var i = new Date(this.s[e].created_at).toISOString().substr(0, 10)
        if (dates.inRange(i,this.startDate,this.endDate)) {
          expo.push(this.s[e])
        }
      }
      this.getAgeData(expo)
    },
    
    getSum () {
      var counter = 0
      for (var vac in this.seriesnamesum) {
        this.seriesdatasum = []
        this.seriesdatasum.push(this.seriesnamesum[vac])
        this.seriesdatasum.push(this.getNumsum(this.seriesnamesum[vac]))
        counter += this.getNumsum(this.seriesnamesum[vac])
        this.date.push(this.seriesdatasum)
      }
      this.barOptionsSummary.series[0].data = this.date
    },
    getDep () {
      // eslint-disable-next-line no-unused-vars
      var count = 0
      for (var v in this.seriesname) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesname[v])
        this.seriesdata.push(this.getNum(this.seriesname[v]))
        count += this.getNum(this.seriesname[v])
        this.locations.push(this.seriesdata)
      }
      this.pieOptions.series[0].data = this.locations
    },
    //  getTypes () {
    //   var counter = 0
    //   for (var va in this.seriesnames) {
    ///   this.seriesdatas = []
    //  this.seriesdatas.push(this.seriesnames[va])
    //  this.seriesdatas.push(this.getNums(this.seriesnames[va]))
    // counter += this.getNums(this.seriesnames[va])
    //  this.type.push(this.seriesdatas)
    // }
    // this.barOptions.series[0].data = this.type
    //  },

    getExp () {
      if (this.user.role_id === 1 || this.user.role_id === 5) {
        axios.get('exposures/all/')
          .then((exp) => {
            this.s = exp.data.data
            if (exp.data.links.next != null) {
              this.link = exp.data.links.next
              // this.c = exp.data.cadre.meta.total // total cadre
              this.loopT(this.link)
            } else {
              this.getAgeData()
            }
          })
          .catch(error => console.log(error.message))
      } else if (this.user.role_id === 4) {
        axios.get(`exposures/facility/${this.user.hcw.facility_id}`)
          .then((exp) => {
            this.s = exp.data.data
            if (exp.data.links.next != null) {
              this.link = exp.data.links.next
              // this.c = exp.data.cadre.meta.total // total cadre
              this.loopT(this.link)
            } else {
              this.getAgeData()
            }
          })
          .catch(error => console.log(error.message))
      } 
    },

    getCad () {
      axios.get('cadres')
        .then((cad) => {
          this.cadres = cad.data.data
          // this.link = cad.data.links.next
          // this.loopT(this.link)
          console.log(cad.data.data)
        })
        .catch(error => console.log(error.message))
    },

    async loopT (l) {
      var i,u = []
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.s = this.s.concat(response.data.data)
        } else {
          i = 11
        }
      }
      if (this.user.role_id == 5) {
        for (var i in this.s) {
          if (this.s[i].county == this.user.county) {
            u.push(this.s[i])
          }
        }
        this.s = u
      }
      this.getDep()
      this.getAgeData()
     // this.getSum()
    },

    getAgeData (list) {
      //
      var data = []
      for (var i in this.barOptionsAge.xAxis.categories) {
        data.push(this.getAgeNum(i))
      }
      this.barOptionsAge.series[0].data = data
      this.value = false

      var data = []
      for (var i in this.gendOptions.xAxis.categories) {
        data.push(this.getGend(this.gendOptions.xAxis.categories[i]))
      }
      this.gendOptions.series[0].data = data
      this.value1 = false

      var data = []
      for (var i in this.barOptionsDevice.xAxis.categories) {
        data.push(this.getDevice(this.barOptionsDevice.xAxis.categories[i]))
      }
      this.barOptionsDevice.series[0].data = data
      // this.value1 = false

      var datac = []
      for (var i in this.barOptionsCadre.xAxis.categories) {
        datac.push(this.getNumc(this.barOptionsCadre.xAxis.categories[i]))
      }
      this.barOptionsCadre.series[0].data = datac
      // this.valuec = false

      var data = []
      for (var i in this.barOptionsLocation.xAxis.categories) {
        data.push(this.getNum(this.barOptionsLocation.xAxis.categories[i]))
      }
      this.barOptionsLocation.series[0].data = data

      var data = []
      for (var i in this.barOptions.xAxis.categories) {
        data.push(this.getNums(this.barOptions.xAxis.categories[i]))
      }
      this.barOptions.series[0].data = data
      this.valuet = false

      var data = []
      for (var i in this.barOptionsHour.xAxis.categories) {
        data.push(this.getNumh(this.barOptionsHour.xAxis.categories[i]))
      }
      this.barOptionsHour.series[0].data = data

      this.load = true
      var data = []
      for (var i in this.barOptionsTime.xAxis.categories) {
        data.push(this.getNumt(this.barOptionsTime.xAxis.categories[i],list))
      }
      this.barOptionsTime.series[0].data = data
      this.load = false
    },
    getAgeNum (cat) {
      var count = 0
      for (var x in this.s) {
        var date = new Date(this.s[x].dob)
        var diff_ms = Date.now() - date.getTime()
        var age_dt = new Date(diff_ms)
        var age = Math.abs(age_dt.getUTCFullYear() - 1970)
        if (age >= 18 && age < 26 && cat == 0) {
          count++
        } else if (age > 25 && age <= 35 && cat == 1) {
          count++
        } else if (age > 35 && age <= 45 && cat == 2) {
          count++
        } else if (age > 45 && age <= 55 && cat == 3) {
          count++
        } else if (age > 55 && age <= 65 && cat == 4) {
          count++
        } else if (age > 65 && cat == 5) {
          count++
        } else if (age < 18 && cat == 6){
          count++
        }
         else {
          count
        }
      }
      return count
    },
    getGend (cat) {
      var count = 0
      for (var x in this.s) {
        if (this.s[x].gender === cat) {
          count++
        }
      }
      return count
    },
    getGp (cat, num) {
      var count = 0
      for (var x in this.s) {
        if (this.s[x].gender === cat && this.s[x].gender === num) {
          count++
           console.log((count / 100 ) * (cat + num))
        }
      }

    },

    getDevice (cat) {
      var count = 0
      for (var x in this.s) {
        if (this.s[x].device_used === cat) {
          count++
        }
      }
      return count
    },
    getNum (name) {
      var count = 0
      for (var x in this.s) {
        if (this.s[x].exposure_location === name) {
          count++
        }
      }
      return count
    },
    getNums (cat) {
      var counter = 0
      for (var xo in this.s) {
        if (this.s[xo].exposure_type === cat) {
          counter++
        }
      }
      return counter
    },
    getNumc (name) {
      var counter = 0
      for (var xc in this.s) {
        if (this.s[xc].cadre === name) {
          counter++
        }
      }
      return counter
    },
    getNumt (name, expo) {
      var counter = 0
      for (var xt in expo) {
        if (expo[xt].exposure_date.slice(0, 3) === name) {
          counter++
        }
      }
      return counter
    },

    getNumsum (name) {
      var counter = 0
      for (var xsum in this.s) {
        if (this.s[xsum].date.slice(0, 3) === name) {
          counter++
        }
      }
      return counter
    },

    getNumh (name) {
      var counter = 0
      for (var xh in this.s) {
        if (moment(this.s[xh].created_at).format().substr(11, 2) === name) {
          console.log('l')
          // console.log(moment(this.s[xh].created_at).format('LT'))
          counter++
        }
      }
      return counter
    }
  }
}
</script>
