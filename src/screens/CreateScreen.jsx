import { use, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'


const CreateScreen = ({ data, setData }) => {
  const [stockAmt, setStockAmt] = useState("")
  const [itemName, setItemName] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [editItemId, setEditItemId] = useState(null)
  const addItemHandler = () => {
    const newItem = {
      id: Date.now(),
      name: itemName,
      stock: stockAmt
    }
    setData([...data, newItem])
    setItemName("")
    setStockAmt("")
    setIsEdit(false)
  }

  const deleteItemHandler = (id) => {
    setData(data.filter(item => item.id != id))
  }

  const editeItemHandler = (item) => {
    setIsEdit(true)
    setItemName(item.name)
    setEditItemId(item.id)
  }

  const updateItemHandler = () => {
    setData(data.map(item => item.id === editItemId ? { ...item, name: itemName, stock: stockAmt } : item))
    setItemName("")
    setStockAmt("")
    setIsEdit(false)
    setEditItemId(null)
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter a Item  Name...'
        placeholderTextColor="#999"
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        placeholder='Enter Stock Amount'
        placeholderTextColor="#999"
        style={styles.input}
        value={stockAmt}
        onChangeText={setStockAmt}
      />
      <Pressable style={styles.addButton} onPress={() => isEdit ? updateItemHandler() : addItemHandler()}>
        <Text style={styles.btnText}>{isEdit ? "EDIT ITEM IN STOCK" : "ADD ITEM IN STOCK"}</Text>
      </Pressable>
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.heaidngText}>All Items In A Stock</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer, { backgroundColor: item.stock < 20 ? "#FFCCCC" : "#D7F6BFFF" }]}>
              <Text style={styles.itemText}>{item.name}</Text>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <Text style={styles.itemText}>{item.stock}</Text>
                <Pressable onPress={() => editeItemHandler(item)}>
                  <Text style={styles.itemText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deleteItemHandler(item.id)}>
                  <Text style={styles.itemText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </View>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
  container: {
    paddingVertical: "4%",
    gap: 10
  },
  input: {
    borderWidth: 2,
    borderColor: "#D7F6BFFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7
  },
  addButton: {
    backgroundColor: "#CABFEEFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  heaidngText: {
    fontWeight: "bold",
    fontSize: 20,
    paddingVertical: 10
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7
  },
  itemText: {
    fontWeight: "400",
    fontSize: 15
  }
})