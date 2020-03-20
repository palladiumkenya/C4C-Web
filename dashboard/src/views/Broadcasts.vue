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
        xs8
        text-xs-center>

        <v-btn
          class="mx-0 font-weight-light"
          color="success"
          @click="$router.push('new-broadcast')"
        >
          Send A New Broadcast
        </v-btn>
      </v-flex>

      <v-flex
        md12
      >
        <material-card
          color="green"
          title="Broadcast Messages"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
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
              <td> {{ item.cadre }}</td>
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
        value: 'number'

      },
      {
        sortable: false,
        text: 'Title',
        value: 'name'
      },
      {
        sortable: false,
        text: 'Facility',
        value: 'country'
      },
      {
        sortable: false,
        text: 'Cadre',
        value: 'cadre'
      },
      {
        sortable: false,
        text: 'Approved By',
        value: 'approved_by'
      }

    ],
    items: [
      {
        name: 'Dakota Rice',
        country: 'Niger',
        city: 'Oud-Tunrhout',
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
      }
    ]
  })
}
</script>
