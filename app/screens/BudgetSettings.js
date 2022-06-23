import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Button,
  Title,
  TextInput,
  IconButton,
  Colors,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { AllotmentModel } from "../models/allotment_model";
import { IncomeModel } from "../models/income_model";

async function Allotments(props) {
  let allotments = await AllotmentModel.getAll();

  const periods = AllotmentModel.periods.map((period) => {
    return { label: period, value: period };
  });

  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginVertical: 10 }}>
        {allotments.map((allotment, index) => {
          return (
            <View key={index} style={{ flexDirection: "column" }}>
              <TextInput
                mode="outlined"
                label="Name"
                value={allotment.name}
                onChangeText={(v) => {
                  realm.write(() => {
                    allotment.name = v;
                  });
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={{ flex: 1 }}
                  mode="outlined"
                  label="amount"
                  value={String(allotment.amount)}
                  onChangeText={(v) => {
                    v = v.replace(/[^0-9%]/, "");
                    realm.write(() => {
                      allotment.amount = v;
                    });
                  }}
                />
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <DropDown
                    label={"Period"}
                    mode={"outlined"}
                    list={periods}
                    value={allotment.period}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    setValue={(v) => {
                      realm.write(() => {
                        allotment.period = v;
                      });
                    }}
                  />
                </View>
                <IconButton
                  icon="delete"
                  color={Colors.red500}
                  onPress={() => {
                    realm.write(() => {
                      realm.delete(allotment);
                    });
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
      <Button
        mode="contained"
        onPress={() => {
          realm.write(() => {
            realm.create("Allotments", AllotmentModel.generate({}));
          });
        }}
      >
        Add allotment
      </Button>
    </ScrollView>
  );
}

function BudgetSettings(props) {
  let income = IncomeModel.getAll()[0];
  if (income === undefined) {
    realm.write(() => {
      income = IncomeModel.create({});
    });
  }
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        keyboardType="numeric"
        style={{ marginVertical: 10 }}
        mode="outlined"
        label="income/year"
        value={income === income.amount}
        onChangeText={(v) => {
          v = parseInt(v.replace(/[^0-9,]/, ""));
          realm.write(() => {
            income.amount = v;
          });
        }}
      />
      <Title>Allotments:</Title>
      <Allotments></Allotments>
    </View>
  );
}

export default BudgetSettings;
