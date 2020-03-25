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
          /><br>
          <v-data-table
            :headers="headers"
            :items="exposures"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            show-actions
            item-key="name"
          >
            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.number }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.country }}</td>
                <td>{{ props.item.cadre }}</td>
                <td>{{ props.item.approved_by }}</td>
              </tr>
            </template>
            <template
              slot="expand"
              slot-scope="props">
              <v-card flat>
                <v-card-text>Cadre: {{ props.item.cadre }} <br> Location: {{ props.item.city }} <v-spacer/> {{ props.item.name }}</v-card-text>
              </v-card>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      rowsPerPageItems: [50, 250, 500],
      search: '',
      output: [],
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
        }

      ]
    }
  },
  created () {
    this.getExp()
  },
  methods: {
    getExp () {
      let headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJhYzI0ZDAwMTVlM2M2ODVjZTU0ZjZjY2M2Mzc0NDdlODgwYzcxNzI0MmRiY2JhMTViYjhmODFmNzY1NGFiYWY2OTIwZjU3YzdhYjNkMjg1In0.eyJhdWQiOiIxIiwianRpIjoiYmFjMjRkMDAxNWUzYzY4NWNlNTRmNmNjYzYzNzQ0N2U4ODBjNzE3MjQyZGJjYmExNWJiOGY4MWY3NjU0YWJhZjY5MjBmNTdjN2FiM2QyODUiLCJpYXQiOjE1ODUwMzMzOTQsIm5iZiI6MTU4NTAzMzM5NCwiZXhwIjoxNjE2NTY5Mzk0LCJzdWIiOiI4MTczIiwic2NvcGVzIjpbXX0.PKt1C21m-pr7cUGJKydHf0sRyJsIfbodtPW7oJjmorOnaevjVeCc9EwwqsYXQ3LzIom6Yvb8pSSAQ8-XMmaupgrym-nrtrFVSFY3pf9rnCAlwBRkNU0Ynh1VVavlTEp-gl6Z8kUvAbeNszzqZhIahYCgDlp7di8UF7NQaqI9hXpqvXIKhAi84ISZriv7zQw1PFmErjnCaH1zixrIBqY6iw4bEL9vFCCPcl_lCi2oVwYaAE1Qou1pZknGUSjxfi35BjNrLmYTlGGlKj5qft2TILHJ6AVEENHq7g_9-Sp6gYorewKiS06xSPBAAz9kNJ6zwNzuev2UFqNpIwl2ZbCpG6w9C3SEOaRJIS5ape7NT3PEyLGw4evnoIjPz-Gmsmi0ev2T_LPbJ4q3hxLoAX4wB78u5B1DkGUvsimYjJGaHNv1W6ICB5MWeVfMk3tBxNe1HKbts7C4Izkr90GmgEmFG3OoATzYG_u4t5CsXjFz24loOuyh3kOpT5GQy5nBWaCiv737TRaTxscyikF9ZXPzlwTO8uxfDYFZKHIh4uhgxSrc7qaj1-hajz0zV3xOdmdk3mgQU3NcRWifMcSVytMYNUdrntRaVlkrBXZGLORj99EckdgdzV0XgQduUMM1nVPUieBAm6F53a96TtpWuATezLx1HuNe2YeNFjKmDRZml3Q')
      axios.get('http://c4ctest.mhealthkenya.org/api/exposures/all', headers)
        .then(res => (this.output = res.data))
        .then(json => console.log(json))
        .catch(error => console.log(error.message))
    }
  }
<<<<<<< HEAD
=======
}
>>>>>>> 2cee6ee4b08655ffbfc29a505b056b45d71c19b6
</script>
