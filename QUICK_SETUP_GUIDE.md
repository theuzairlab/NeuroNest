# Quick Setup Guide - Fix API Connection

## 🚨 IMPORTANT: Create .env.local file

**Step 1:** Create a new file in your project root folder called `.env.local`

**Step 2:** Add this single line to the file:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Step 3:** Save the file and restart your development server:
```bash
npm run dev
```

## 🔧 Manual File Creation (Windows):

1. **Right-click** in your project folder
2. **New** → **Text Document**
3. **Name it** `.env.local` (including the dot at the start)
4. **Open the file** and add the line above
5. **Save** the file

## ✅ Verification:

After creating the `.env.local` file, your messages should now get proper responses:

- ❌ **Before**: "Please select the appropriate agent from the left side"
- ✅ **After**: Actual medical advice from the selected agent

## 🎯 Test Messages:

Try these to test the new agent system:

1. **Mental Health**: "I feel emotional and my mind is out of control"
   → Should route to **Mental Health Agent**

2. **Physical Symptoms**: "I have a headache, what can I do"
   → Should route to **Health Check Agent**

3. **Emergency**: "This is urgent, help me immediately"
   → Should route to **Emergency Agent**

## 📋 Features Now Working:

- ✅ **Smart Agent Selection**: Auto-detects the best specialist
- ✅ **Manual Agent Override**: You can choose any agent manually
- ✅ **Real Medical Responses**: No more generic "select agent" messages
- ✅ **Agent Indicator**: Shows which specialist is responding
- ✅ **Quick Agent Buttons**: Fast switching between specialists

## 🔍 If It Still Doesn't Work:

1. **Check** your backend is running on `http://localhost:8000`
2. **Verify** the `.env.local` file is in the correct location
3. **Restart** your development server
4. **Check** browser console for any error messages

Your medical AI should now provide proper specialist responses! 🎉 