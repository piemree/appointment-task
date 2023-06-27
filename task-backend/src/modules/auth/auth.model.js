const mongoose = require("mongoose");
      const Schema = mongoose.Schema;
      
      const AuthSchema = new Schema({

        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      });
      
      module.exports = mongoose.model("Auth", AuthSchema);
      