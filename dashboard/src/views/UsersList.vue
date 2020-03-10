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
          flat
          full-width
          title="All Users"
        >
          <v-data-table
            :headers="headers"
            :items="items.slice(0, 7)"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.number }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>
                       

            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        sortable: false,
        text: 'Number',
        value: 'number',
      },
      {
        sortable: false,
        text: 'Name',
        value: 'name'
      },
      {
        sortable: false,
        text: 'Country',
        value: 'country'
      },
      {
        sortable: false,
        text: 'City',
        value: 'city'
      },
       
    ],
    items: [
      {
        number: '1',
        name: 'Dakota Rice',
        country: 'Niger',
        city: 'Oud-Tunrhout',
        
      },
      {
        name: 'Minerva Hooper',
        country: 'Curaçao',
        city: 'Sinaai-Waas',
        number: '2'
      }, {
        name: 'Sage Rodriguez',
        country: 'Netherlands',
        city: 'Overland Park',
        number: '3'
      }, {
        name: 'Philip Chanley',
        country: 'Korea, South',
        city: 'Gloucester',
        number: '4'
      }, {
        name: 'Doris Greene',
        country: 'Malawi',
        city: 'Feldkirchen in Kārnten',
        number: '5'
      }, {
        name: 'Mason Porter',
        country: 'Chile',
        city: 'Gloucester',
        number: '6'
      }
    ]
  })
}
</script>

