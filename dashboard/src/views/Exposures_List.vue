<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="green"
          title="Broadcast Messages"
        >
         <v-text-field
          v-model="search"
          append-icon="mdi-search-web"
          label="Search"
          single-line
          hide-details
        ></v-text-field><br>
      <v-data-table
        :headers="headers"
        :items="exposures"
        :search="search"
        hide-actions
        item-key="name"
      >
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td>{{ props.item.number }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.country }}</td>
            <td>{{ props.item.cadre }}</td>
            <td>{{ props.item.approved_by }}</td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-card-text>Cadre: {{ props.item.cadre}} <br> Location: {{props.item.city}} <v-spacer></v-spacer> {{props.item.name}}</v-card-text>
          </v-card>
        </template>
      </v-data-table>
     </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Number',
            value: 'number'
          },
          {
            sortable: false,
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Facility',
            value: 'country'
          },
          {
            sortable: false,
            text: 'Cadre',
            value: 'cadre'
          },
          {
            text: 'Approved By',
            value: 'approved_by'
          }
        ],
        exposures: [
          {
            name: 'Dakota Rice',
            country: 'Niger',
            city: 'Oud-Tunrhout',
            approved_by: 'Brian',
            number: '1',
            cadre: 'Nurse'
          },
          {
            name: 'Minerva Hooper',
            country: 'Curaçao',
            city: 'Sinaai-Waas',
            number: '2',
            cadre: 'Nurse'
          },
          {
            name: 'Sage Rodriguez',
            country: 'Netherlands',
            city: 'Overland Park',
            number: '3',
            cadre: 'Nurse'

          },
          {
            name: 'Philip Chanley',
            country: 'Korea, South',
            city: 'Gloucester',
            number: '3',
            cadre: 'Nurse'
          },
          {
            name: 'Doris Greene',
            country: 'Malawi',
            city: 'Feldkirchen in Kārnten',
            number: '4',
            cadre: 'Nurse'
          }, {
            name: 'Mason Porter',
            country: 'Chile',
            city: 'Gloucester',
            number: '5',
            cadre: 'Nurse'
          },
            
        ]
      }
    }
  }
</script>