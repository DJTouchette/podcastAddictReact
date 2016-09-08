export function formEdit(field, ogValue, id, event, ctx) {
  if (ctx.state.form.length <= 0) {
    ctx.setState({
      form: ctx.state.form.concat({
        [field]: event.target.value,
        id: id,
        ogValue: ogValue,
      })
    });
    return;
  };
  let exists = false;
  const newState = ctx.state.form.map((item, index) => {
    let objKeys = Object.keys(item);
    let returnValue = item;
    if (item.id == id) {
      for (let i = 0; i < objKeys.length; i++) {
          if (objKeys[i] == field) {
            returnValue =  {
              [field]: event.target.value,
              id: id,
              ogValue: ogValue,
             }
             exists = true;
          }
      }
    }
    return returnValue;
  });

  if (!exists) {
    ctx.setState({
      form: newState.concat({
        [field]: event.target.value,
        id: id,
        ogValue: ogValue,
      })
    });
    return;
  }

  ctx.setState({ form: newState });

}



export function handleSelectableClick(ctx, selectedState) {
  if (this.state.selectedProducts.length == 0) {
    this.setState({
      selectedProducts: this.state.selectedProducts.concat(item),
    });
    return;
  }
  let found = false;
  const selectedProducts = this.state.selectedProducts.map((product, index) => {
    if (product.id == item.id) {
      found = true;
      return;
    }
    return product;
  }).filter(Boolean);
  if (found) {
    this.setState({
      selectedProducts: selectedProducts,
    });
    return;
  }

  this.setState({
    selectedProducts: this.state.selectedProducts.concat(item),
  })
}
