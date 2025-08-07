             {steps.map((step, idx) => (
               <React.Fragment key={idx}>
                 {/* Number + Text */}
                 <div className="flex flex-col items-start w-64 flex-shrink-0">
                   <span
                     className="text-9xl font-light"
                     style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                   >
                     {`0${idx + 1}`}
                   </span>
                   <h3
                     className="text-3xl md:text-4xl font-medium text-left mt-2"
                     style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                   >
                     {step.title}
                   </h3>
                   <p
                     className="text-sm leading-relaxed text-left mt-1"
                     style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                   >
                     {step.description}
                   </p>
                 </div>
-                {/* Horizontal separator */}
-                {idx < steps.length - 1 && (
-                  <div className="self-center flex-shrink-0 w-12 h-px bg-gray-300/50" />
-                )}
+                {/* Horizontal separator */}
+                {idx < steps.length - 1 && (
+                  <div className="self-center flex-shrink-0 flex-1 h-px bg-gray-300/50" />
+                )}
               </React.Fragment>
             ))}
